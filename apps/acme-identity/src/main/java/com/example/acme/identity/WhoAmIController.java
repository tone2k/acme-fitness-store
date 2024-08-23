package com.example.acme.identity;

import static java.util.Collections.emptyMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WhoAmIController {

	private final Logger log = LoggerFactory.getLogger(WhoAmIController.class);

	@GetMapping("/whoami")
	public Map<String, String> getUserInfo(Authentication authentication) {
		log.debug("/whoami endpoint is triggered.");

		if (authentication == null) {
			log.warn("Authentication is null cannot extract user info");
			return emptyMap();
		}


		return Map.of(
				"userId", authentication.getName(),
				"userName", authentication.getName()
		);
	}

}
