package br.com.desafio;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import br.com.desafio.ApiwebApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ApiwebApplication.class)
@WebAppConfiguration
public class ApiwebApplicationTests {

	@Test
	public void contextLoads() {
	}

}
