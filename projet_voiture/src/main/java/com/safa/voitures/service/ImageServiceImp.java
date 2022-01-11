package com.safa.voitures.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.safa.voitures.entities.Image;
import com.safa.voitures.repos.ImageRepository;

public class ImageServiceImp implements ImageService{
	@Autowired
	ImageRepository ImageRepository;
	/*
	@Override
	public List<Image> findByVoiture(Voiture voiture) {
		return ImageRepository.findByVoiture(voiture);
	}
	@Override
	public List<Image> findByVoitureIdVoiture(Long id) {
		return ImageRepository.findByVoitureIdVoiture(id);
	}
	*/
	@Override
	public List<Image> getAllImages() {
		return ImageRepository.findAll();

	}
	@Override
	public List<Image> findByVoitureIdVoiture(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
}
