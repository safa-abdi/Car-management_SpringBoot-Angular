package com.safa.voitures.repos;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.safa.voitures.entities.Image;
import com.safa.voitures.entities.Voiture;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String name);
    @Query("select I from Image I where I.voiture = ?1")
	 List<Image> findByVoiture (Voiture voiture);
    Optional<Image> findByVoitureIdVoiture(Long idVoiture);
    
}