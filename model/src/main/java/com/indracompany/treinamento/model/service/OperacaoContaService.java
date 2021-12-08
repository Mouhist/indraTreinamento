package com.indracompany.treinamento.model.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.OperacaoContaDTO;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.repository.OperacaoContaRepository;


@Service
public class OperacaoContaService extends GenericCrudService<OperacaoConta, Long, OperacaoContaRepository> {
	
	@Autowired
	private OperacaoContaRepository operacaoContaRepository;
	
	@Autowired
	private ContaBancariaService contaBancariaService;
	
	public void salvandoOperacoes(ContaBancaria contaBancaria, Double valor, String tipoOperacao, String observacao) {
		
		if(!contaBancariaService.validaContaBancaria(contaBancaria) && valor == null && tipoOperacao == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_VALIDACAO); 
		}
		
		OperacaoConta opc = new OperacaoConta();
		opc.setConta(contaBancaria);
		opc.setValor(valor);
		opc.setTpOperacao((tipoOperacao.charAt(0)));
		opc.setObservacao(observacao);
		opc.setDataHora(java.time.LocalDateTime.now());
		super.salvar(opc);
	}
	
	public List<OperacaoContaDTO> extratoContaBancaria(Long idConta){
		ContaBancaria cb = contaBancariaService.buscar(idConta);
		List<OperacaoConta> operacoes = operacaoContaRepository.buscarOperacoesConta(cb);
		
		return this.converterOperacoes(operacoes);
		
	}
	
	public List<OperacaoContaDTO> extratoContaBancariaPeriodo(Long idConta, String dtInicio, String dtFinal){
		ContaBancaria cb = contaBancariaService.buscar(idConta);
		DateTimeFormatter parser = DateTimeFormatter.ofPattern("dd-MM-uuuu");
		LocalDateTime dataFim = LocalDate.parse(dtFinal, parser).atTime(23, 59, 59);
		LocalDateTime dataInicio = LocalDate.parse(dtInicio, parser).atStartOfDay();
		List<OperacaoConta> operacoes = operacaoContaRepository.buscarOperacoesContaPeriodo(cb, dataInicio, dataFim);
		
		return this.converterOperacoes(operacoes);
		
	}
	
	private List<OperacaoContaDTO> converterOperacoes(List<OperacaoConta> operacoes){
		if (operacoes == null || operacoes.isEmpty()) {
			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
		}
		
		List<OperacaoContaDTO> operacoesContas = new LinkedList<>();
		
		for (OperacaoConta opr : operacoes) {
			OperacaoContaDTO oprDto = new OperacaoContaDTO();
			BeanUtils.copyProperties(opr, oprDto);
			operacoesContas.add(oprDto);			
		}
		
		return operacoesContas;
	}
}
