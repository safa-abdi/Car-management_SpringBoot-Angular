package com.safa.users.security;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	// classe de configuration de spring security
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//desactiver csrf pas de gestion de stateful des session(on va utilisé les token:statless)
		http.csrf().disable();
		http.cors().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		//consulter tous les voitures
		http.authorizeRequests().antMatchers("/api/all/**").hasAnyAuthority("ADMIN","USER");
		http.authorizeRequests().antMatchers("/Mapi/all/**").hasAnyAuthority("ADMIN","USER");
		http.authorizeRequests().antMatchers("image/**").hasAnyAuthority("ADMIN","USER");

		 //consulter une voiture par son id
		http.authorizeRequests().antMatchers(HttpMethod.GET,"/api/**").hasAnyAuthority("ADMIN","USER");
		http.authorizeRequests().antMatchers(HttpMethod.GET,"/Mapi/**").hasAnyAuthority("ADMIN","USER");
		http.authorizeRequests().antMatchers(HttpMethod.GET,"image/**").hasAnyAuthority("ADMIN","USER");

//operation pour l'admin seul(ajout,modif,supp)
		
		 //ajouter un nouveau produit
		http.authorizeRequests().antMatchers(HttpMethod.POST,"/api/**").hasAuthority("ADMIN");
		http.authorizeRequests().antMatchers(HttpMethod.POST,"/Mapi/**").hasAuthority("ADMIN");
		http.authorizeRequests().antMatchers(HttpMethod.POST,"image/**").hasAuthority("ADMIN");

		 //modifier un produit
		http.authorizeRequests().antMatchers(HttpMethod.PUT,"/api/**").hasAuthority("ADMIN");
		http.authorizeRequests().antMatchers(HttpMethod.PUT,"/Mapi/**").hasAuthority("ADMIN");
		http.authorizeRequests().antMatchers(HttpMethod.PUT,"image/**").hasAuthority("ADMIN");

		//supprimer un produit
		http.authorizeRequests().antMatchers(HttpMethod.DELETE,"/api/**").hasAuthority("ADMIN");
		http.authorizeRequests().antMatchers(HttpMethod.DELETE,"/Mapi/**").hasAuthority("ADMIN");
		http.authorizeRequests().antMatchers(HttpMethod.DELETE,"image/**").hasAuthority("ADMIN");
		http.authorizeRequests().anyRequest().authenticated();
		http.addFilterBefore(new JWTAuthorizationFilter(),UsernamePasswordAuthenticationFilter.class);

	}
	
}
