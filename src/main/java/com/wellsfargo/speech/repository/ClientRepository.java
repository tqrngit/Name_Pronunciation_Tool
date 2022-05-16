package com.wellsfargo.speech.repository;

import com.wellsfargo.speech.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
