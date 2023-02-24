package ac.cr.ucr.model;
import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class UserInfo implements Serializable {
    @Id
    private UUID userInfoId;

    private String nombre;

    private String primerApellido;

    private String segundoApellido;

    private String identificacion;

    private String unidadAcademica;

    private String telefono;

    public UserInfo() {
        this.userInfoId = UUID.randomUUID();
    }

    public UserInfo(String nombre,
                    String primerApellido,
                    String segundoApellido,
                    String identificacion,
                    String unidadAcademica,
                    String telefono) {
        this.userInfoId = UUID.randomUUID();
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.identificacion = identificacion;
        this.unidadAcademica = unidadAcademica;
        this.telefono = telefono;
    }

    public UUID getUserInfoId() {
        return userInfoId;
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

    @Override
    public String toString() {
        return this.userInfoId.toString();
    }
}

