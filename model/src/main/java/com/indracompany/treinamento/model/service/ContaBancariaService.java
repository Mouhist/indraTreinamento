package com.indracompany.treinamento.model.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ClienteDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.repository.ContaBancariaRepository;


@Service
public class ContaBancariaService extends GenericCrudService<ContaBancaria, Long, ContaBancariaRepository>{

	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private ContaBancariaRepository contaBancariaRepository;
	
	@Autowired
	private OperacaoContaService operacaoContaService;
	
	
	public double consultarSaldo(String agencia, String numeroConta) {
		ContaBancaria c = this.consultarConta(agencia, numeroConta);
		return c.getSaldo();
	}
	
	public ContaBancaria consultarConta(String agencia, String numeroConta) {
		ContaBancaria c = contaBancariaRepository.findByAgenciaAndNumero(agencia, numeroConta);
		if (c == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		return c;
	}

	public List<ContaBancaria> obterContas(String cpf) {
		ClienteDTO dto = clienteService.buscarClientePorCpf(cpf);
		Cliente cliente = clienteService.buscar(dto.getId());
		List<ContaBancaria> contasDoCliente = contaBancariaRepository.findByCliente(cliente);
		return contasDoCliente;
	}
	
	public void depositar(String agencia, String numeroConta, double valor) {
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		conta.setSaldo(conta.getSaldo() + valor);
		super.salvar(conta);
		operacaoContaService.salvandoOperacoes(conta, valor, "D", null);
	}
	
	public void sacar(String agencia, String numeroConta, double valor) {
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INEXISTENTE);
		}
		
		conta.setSaldo(conta.getSaldo() - valor);
		super.salvar(conta);
		operacaoContaService.salvandoOperacoes(conta, valor, "S", null);
	}

	@Transactional(rollbackOn = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		if (dto.getAgenciaOrigem().equals(dto.getAgenciaDestino()) 
				&& dto.getNumeroContaOrigem().equals(dto.getNumeroContaDestino())) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		this.sacar(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor());
		this.depositar(dto.getAgenciaDestino(),dto.getNumeroContaDestino(), dto.getValor());
		this.tranferenciaOperacoesConta(dto);
	}
	
	public void tranferenciaOperacoesConta(TransferenciaBancariaDTO dto) {
		
		ContaBancaria contaOrigem = this.consultarConta(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem());
		ContaBancaria contaDestino = this.consultarConta(dto.getAgenciaDestino(), dto.getNumeroContaDestino());
		operacaoContaService.salvandoOperacoes(contaOrigem, dto.getValor(), "T", null);
		operacaoContaService.salvandoOperacoes(contaDestino, dto.getValor(), "T", null);
	}
	
	
	public boolean validaContaBancaria(ContaBancaria cb) {
		if(cb != null && (!cb.getAgencia().isEmpty() && !cb.getNumero().isEmpty() && cb.getCliente() != null)) {
			return true;
			
		}return false;
		
	}
	
}
