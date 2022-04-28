class Grado {
  final String nombregrado;
  Grado({this.nombregrado});
  factory Grado.fromJson(Map<String, dynamic> json) {
    return Grado(nombregrado: json['nombre']);
  }
}

class Reparto {
  String nombreReparto;
  Reparto({this.nombreReparto});
  factory Reparto.fromJson(Map<String, dynamic> parsedJson) {
    return Reparto(nombreReparto: parsedJson['nombre']);
  }
}

/*
class Persona {
  String nombres;
  Grado grado;
  Persona({this.nombres, this.grado});
  factory Persona.fromJson(Map<String, dynamic> parsedJson) {
    return Persona(
        nombres: parsedJson['nombres'],
        grado: Grado.fromJson(parsedJson['grado']));
  }*/

class Persona {
  String nombres;
  String telefono;
  String correo;
  String dni;
  Grado grado;
  Reparto reparto;
  Persona(
      {this.nombres,
      this.telefono,
      this.correo,
      this.dni,
      this.grado,
      this.reparto});

  factory Persona.fromJson(Map<String, dynamic> parsedJson) {
    return Persona(
        nombres: parsedJson['nombres'],
        telefono: parsedJson['telefono'],
        correo: parsedJson['correo'],
        dni: parsedJson['dni'],
        grado: Grado.fromJson(parsedJson['grado']),
        reparto: Reparto.fromJson(parsedJson['reparto']));
  }
}

class Usuario {
  final String username;
  Persona persona;
  Usuario({this.username, this.persona});
  factory Usuario.fromJson(Map<String, dynamic> parsedJson) {
    return Usuario(
        username: parsedJson['username'],
        persona: Persona.fromJson(parsedJson['persona']));
  }
}
