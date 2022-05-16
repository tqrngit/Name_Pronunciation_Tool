package com.wellsfargo.speech.controller;

import com.wellsfargo.speech.domain.Client;
import com.wellsfargo.speech.repository.ClientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientsController {

    private final ClientRepository clientRepository;

    public ClientsController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @GetMapping
    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Client getClient(@PathVariable Long id) {
        return clientRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createClient(@RequestBody Client client) throws URISyntaxException {
        Client savedClient = clientRepository.save(client);
        return ResponseEntity.created(new URI("/clients/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody Client client) {
        Client currentClient = clientRepository.findById(id).orElseThrow(RuntimeException::new);
        currentClient.setUid(client.getUid());
        currentClient.setFirst_name(client.getFirst_name());
        currentClient.setLast_name(client.getLast_name());
        currentClient.setPreferred_name(client.getPreferred_name());
        currentClient.setPhonetics(client.getPhonetics());
        currentClient.setPronunciation(client.getPronunciation());
        currentClient.setLanguages(client.getLanguages());
        currentClient.setGender(client.getGender());
        currentClient.setSpeed(client.getSpeed());
        currentClient.setBase64Audio(client.getBase64Audio());
        currentClient = clientRepository.save(client);

        return ResponseEntity.ok(currentClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteClient(@PathVariable Long id) {
        clientRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
