package com.safa.voitures.entities;
import javax.persistence.*;
@Entity
@Table(name = "image_table")

public class Image {
  public Image() {
        super();
    }
   public Image(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }
   @ManyToOne
   private Voiture voiture;
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
 private String name;

    @Column(name = "type")
    private String type;
    @Column(name = "picByte", length = 1000)
    private byte[] picByte;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getType() {
        return type;
    }
   public void setType(String type) {
        this.type = type;
    }
    public byte[] getPicByte() {
        return picByte;
    }
    public void setPicByte(byte[] picByte) {
       this.picByte = picByte;
    }
	public Voiture getVoiture() {
		return voiture;
	}
	public void setVoiture(Voiture voiture) {
		this.voiture = voiture;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

}