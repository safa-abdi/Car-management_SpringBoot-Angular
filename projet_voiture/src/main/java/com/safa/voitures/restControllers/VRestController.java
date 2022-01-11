package com.safa.voitures.restControllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.safa.voitures.entities.Voiture;
import com.safa.voitures.service.VoitureService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class VRestController {

@Autowired
VoitureService voitureService;
/*
@RequestMapping(method = RequestMethod.POST)
public void postImage(@RequestParam("file") MultipartFile file) throws IOException {
     System.out.println("received");
}
*/
@RequestMapping(path="all",method = RequestMethod.GET)
public List<Voiture> getAllVoitures()
{    return voitureService.getAllVoitures();		}
		
@RequestMapping(method = RequestMethod.POST)
public Voiture createVoiture(@RequestBody Voiture voiture) {
		return voitureService.saveVoiture(voiture);
}

@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
public void deleteVoiture(@PathVariable("id") Long id)
{
	voitureService.deleteVoitureById(id);
}
@RequestMapping(method = RequestMethod.PUT)
public Voiture updateVoiture(@RequestBody Voiture voiture) {
	return voitureService.updateVoiture(voiture);
	}
@RequestMapping(value="/vt/{id}",method = RequestMethod.GET)
public Voiture getVoitureById(@PathVariable("id") Long id) {
return voitureService.getVoiture(id);
}

@RequestMapping(value="/{idm}",method = RequestMethod.GET)
public List<Voiture> getVoituresByMqId(@PathVariable("idm") Long idmarque) {
return voitureService.findByMarqueIdmarque(idmarque);
}		
	}

