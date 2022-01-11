package com.safa.voitures.restControllers;
import java.io.ByteArrayOutputStream;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.safa.voitures.repos.ImageRepository;
import com.safa.voitures.service.ImageService;
import com.safa.voitures.service.VoitureService;
import com.safa.voitures.entities.Image;
import com.safa.voitures.entities.Voiture;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "image")
public class ImageUploadController {
	  
  @Autowired
    ImageRepository imageRepository;
  @Autowired
  VoitureService voitureService;
  
  
    @PostMapping("/upload")
    public BodyBuilder uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        Image img = new Image(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
        imageRepository.save(img);
        return ResponseEntity.status(HttpStatus.OK);
    }
    @RequestMapping(value="/upload3/{idVoiture}",method = RequestMethod.POST)
    public void uplaodImage3(@PathVariable("idVoiture") Long id,@RequestParam("imageFile") MultipartFile file) throws IOException
    {
    	 Image img = new Image(file.getOriginalFilename(), file.getContentType(),
         compressBytes(file.getBytes()));
    	 Voiture v = voitureService.getVoiture(id); 
         img.setVoiture(v);
         imageRepository.save(img);
    }
    @GetMapping(path = { "nom/get/{imageName}" })
    public Image getImage(@PathVariable("imageName") String imageName) throws IOException {
        final Optional<Image> retrievedImage = imageRepository.findByName(imageName);
        Image img = new Image(retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }
    @GetMapping(path = { "idV/get/{idVoiture}" })
    public Image getVoitureImage(@PathVariable("idVoiture") Long idVoiture) throws IOException {
        final Optional<Image> retrievedImage = imageRepository.findByVoitureIdVoiture(idVoiture);
        Image img = new Image(retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[4096];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();

        } catch (IOException ioe) {

        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
    @RequestMapping(path="allI",method = RequestMethod.GET)
    public List<Image> getAllImages()
    {   
    	return imageRepository.findAll();	
    
    }
    @RequestMapping(value="/{id1}",method = RequestMethod.DELETE)
    public void deleteVoiture(@PathVariable("id1") Long id1)
    {
    	imageRepository.deleteById(id1);
    }
}