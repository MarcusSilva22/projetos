package br.com.desafio.filter;

import java.io.IOException;
import java.rmi.ServerException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;

public class TokenFilter extends GenericFilterBean {

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse response, FilterChain chain)
		throws IOException, ServletException {
		
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		
		String header = request.getHeader("Authorization");
		
		if(header == null || !header.startsWith("Bearer ")){
			throw new ServerException("Token inválido");
		}

		String token = header.substring(7);
		
		//Verifica se o token é válido
		try {
			Jwts.parser().setSigningKey("teste")
			 .parseClaimsJws(token)
			 .getBody();
		} catch (SignatureException e) {
			((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token inválido");
		}	
		
		chain.doFilter(request, response);
	}

}
