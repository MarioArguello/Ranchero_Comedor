class Comedor {
  final String nombre;
  Comedor({this.nombre});
  factory Comedor.fromJson(Map<String, dynamic> json) {
    return Comedor(nombre: json['nombre']);
  }
}

class Tiporancho {
  final String nombretiporancho;
  Tiporancho({this.nombretiporancho});
  factory Tiporancho.fromJson(Map<String, dynamic> json) {
    return Tiporancho(nombretiporancho: json['nombre']);
  }
}

class Menu {
  String descripcion;
  Menu({this.descripcion});
  factory Menu.fromJson(Map<String, dynamic> parsedJson) {
    return Menu(descripcion: parsedJson['descripcion']);
  }
}

class Menudia {
  String dia;
  String precio;
  List<Menu> menu;
  List<Tiporancho> tiporancho;
  List<Comedor> comedor;
  Menudia({this.dia, this.precio, this.menu, this.tiporancho, this.comedor});

  factory Menudia.fromJson(Map<String, dynamic> parsedJson) {
    var list = parsedJson['menus'] as List;
    List<Menu> menu2 = list.map((i) => Menu.fromJson(i)).toList();

    var listtiporancho = parsedJson['tiporanchos'] as List;
    List<Tiporancho> tiporancho2 =
        listtiporancho.map((i) => Tiporancho.fromJson(i)).toList();

    var listComedor = parsedJson['comedors'] as List;
    List<Comedor> comedor2 =
        listComedor.map((i) => Comedor.fromJson(i)).toList();

    return Menudia(
        dia: parsedJson['dia'],
        precio: parsedJson['precio'],
        menu: menu2,
        tiporancho: tiporancho2,
        comedor: comedor2);
  }
}

class Reserva {
  int idreserva;
  final String cantidad;
  final String estado;
  List<Menudia> menudia;
  Reserva({this.cantidad, this.idreserva, this.estado, this.menudia});
  factory Reserva.fromJson(Map<String, dynamic> parsedJson) {
    var list = parsedJson['menudia'] as List;
    List<Menudia> menuDia = list.map((i) => Menudia.fromJson(i)).toList();
    return Reserva(
      idreserva: parsedJson['idreserva'],
      cantidad: parsedJson['cantidad'],
      estado: parsedJson['estado'],
      menudia: menuDia, //  menudia: menudiaList
    );
  }
}
