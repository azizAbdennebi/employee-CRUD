package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Competence;
import com.mycompany.myapp.repository.CompetenceRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Competence}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CompetenceResource {

    private final Logger log = LoggerFactory.getLogger(CompetenceResource.class);

    private static final String ENTITY_NAME = "competence";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompetenceRepository competenceRepository;

    public CompetenceResource(CompetenceRepository competenceRepository) {
        this.competenceRepository = competenceRepository;
    }

    /**
     * {@code POST  /competences} : Create a new competence.
     *
     * @param competence the competence to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new competence, or with status {@code 400 (Bad Request)} if the competence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/competences")
    public ResponseEntity<Competence> createCompetence(@RequestBody Competence competence) throws URISyntaxException {
        log.debug("REST request to save Competence : {}", competence);
        if (competence.getId() != null) {
            throw new BadRequestAlertException("A new competence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Competence result = competenceRepository.save(competence);
        return ResponseEntity
            .created(new URI("/api/competences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /competences/:id} : Updates an existing competence.
     *
     * @param id the id of the competence to save.
     * @param competence the competence to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated competence,
     * or with status {@code 400 (Bad Request)} if the competence is not valid,
     * or with status {@code 500 (Internal Server Error)} if the competence couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/competences/{id}")
    public ResponseEntity<Competence> updateCompetence(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Competence competence
    ) throws URISyntaxException {
        log.debug("REST request to update Competence : {}, {}", id, competence);
        if (competence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, competence.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!competenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Competence result = competenceRepository.save(competence);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, competence.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /competences/:id} : Partial updates given fields of an existing competence, field will ignore if it is null
     *
     * @param id the id of the competence to save.
     * @param competence the competence to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated competence,
     * or with status {@code 400 (Bad Request)} if the competence is not valid,
     * or with status {@code 404 (Not Found)} if the competence is not found,
     * or with status {@code 500 (Internal Server Error)} if the competence couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/competences/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Competence> partialUpdateCompetence(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Competence competence
    ) throws URISyntaxException {
        log.debug("REST request to partial update Competence partially : {}, {}", id, competence);
        if (competence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, competence.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!competenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Competence> result = competenceRepository
            .findById(competence.getId())
            .map(existingCompetence -> {
                if (competence.getName() != null) {
                    existingCompetence.setName(competence.getName());
                }
                if (competence.getLevel() != null) {
                    existingCompetence.setLevel(competence.getLevel());
                }

                return existingCompetence;
            })
            .map(competenceRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, competence.getId().toString())
        );
    }

    /**
     * {@code GET  /competences} : get all the competences.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of competences in body.
     */
    @GetMapping("/competences")
    public List<Competence> getAllCompetences() {
        log.debug("REST request to get all Competences");
        return competenceRepository.findAll();
    }

    /**
     * {@code GET  /competences/:id} : get the "id" competence.
     *
     * @param id the id of the competence to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the competence, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/competences/{id}")
    public ResponseEntity<Competence> getCompetence(@PathVariable Long id) {
        log.debug("REST request to get Competence : {}", id);
        Optional<Competence> competence = competenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(competence);
    }

    /**
     * {@code DELETE  /competences/:id} : delete the "id" competence.
     *
     * @param id the id of the competence to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/competences/{id}")
    public ResponseEntity<Void> deleteCompetence(@PathVariable Long id) {
        log.debug("REST request to delete Competence : {}", id);
        competenceRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
