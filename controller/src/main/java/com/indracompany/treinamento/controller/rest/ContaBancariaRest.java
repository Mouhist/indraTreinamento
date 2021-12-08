package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.dto.DepositoDTO;
import com.indracompany.treinamento.model.dto.OperacaoContaDTO;
import com.indracompany.treinamento.model.dto.SaqueDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.service.ContaBancariaService;
import com.indracompany.treinamento.model.service.OperacaoContaService;

@RestController
@RequestMapping("rest/contas")
public class ContaBancariaRest extends GenericCrudRest<ContaBancaria, Long, ContaBancariaService>{
	
	@Autowired
	private ContaBancariaService contaBancariaService;
	
	@Autowired
	private OperacaoContaService operacaoContaService;
	
	
	@GetMapping(value = "/consultar-saldo/{agencia}/{conta}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Double> consultarSaldo(@PathVariable String agencia, @PathVariable String conta) {
		
		double saldo = contaBancariaService.consultarSaldo(agencia, conta);
		return new ResponseEntity<>(saldo,HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/consultar-contas-cliente/{cpf}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<ContaBancaria>> consultarContasPorCliente(@PathVariable String cpf){
		
		List<ContaBancaria> contasCliente = contaBancariaService.obterContas(cpf);
		return new ResponseEntity<>(contasCliente, HttpStatus.OK);
	}
	
	@PostMapping(value = "/deposito", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> depositar(@RequestBody DepositoDTO dto){
		contaBancariaService.depositar(dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	@PostMapping(value = "/saque", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> sacar(@RequestBody SaqueDTO dto){
		contaBancariaService.sacar(dto.getAgencia(), dto.getNumeroConta(), dto.getValor());
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping(value = "/transferencia", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Void> sacar(@RequestBody TransferenciaBancariaDTO dto){
		contaBancariaService.transferir(dto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping(value = "/extrato/{id}/{dtInicio}/{dtFinal}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<OperacaoContaDTO>> extratoDoCliente(@PathVariable Long id, String dtInicio, String dtFinal){
		
		return new ResponseEntity<>(operacaoContaService.extratoContaBancariaPeriodo(id, dtInicio, dtFinal), HttpStatus.OK);
	}
	
}
	
