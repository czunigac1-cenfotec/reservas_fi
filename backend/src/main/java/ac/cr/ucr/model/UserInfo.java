package ac.cr.ucr.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class UserInfo implements Serializable {
    @Id
    private UUID userInfoUuid;

    public void setUserInfoUuid(UUID userInfoUuid) {
        this.userInfoUuid = userInfoUuid;
    }

    private String email;

    private String nombre;

    private String primerApellido;

    private String segundoApellido;

    private String identificacion;

    private String unidadAcademica;

    private String telefono;

    @Column(nullable = false)
    private LocalDateTime creationDateTime;

    public UserInfo() {
        this.userInfoUuid = UUID.randomUUID();
        this.creationDateTime = LocalDateTime.now();
    }

    public UserInfo(
            String email,
            String nombre,
            String primerApellido,
            String segundoApellido,
            String identificacion,
            String unidadAcademica,
            String telefono) {
        this();
        this.email = email;
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.identificacion = identificacion;
        this.unidadAcademica = unidadAcademica;
        this.telefono = telefono;
    }

    public UUID getUserInfoUuid() {
        return userInfoUuid;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getUnidadAcademica() {
        return unidadAcademica;
    }

    public void setUnidadAcademica(String unidadAcademica) {
        this.unidadAcademica = unidadAcademica;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    @Override
    public String toString() {
        return this.userInfoUuid.toString();
    }
}

