package com.safa.voitures.service;

import java.util.List;
import com.safa.voitures.entities.Image;

public interface ImageService {
	 List<Image> findByVoitureIdVoiture(Long id);
	/* List<Image> findByVoiture (Voiture voiture);*/
		List<Image> getAllImages();

}
