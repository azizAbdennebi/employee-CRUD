package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CompetenceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Competence.class);
        Competence competence1 = new Competence();
        competence1.setId(1L);
        Competence competence2 = new Competence();
        competence2.setId(competence1.getId());
        assertThat(competence1).isEqualTo(competence2);
        competence2.setId(2L);
        assertThat(competence1).isNotEqualTo(competence2);
        competence1.setId(null);
        assertThat(competence1).isNotEqualTo(competence2);
    }
}
