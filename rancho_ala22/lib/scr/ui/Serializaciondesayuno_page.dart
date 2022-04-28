class Comedordesayuno {
  final String nombre;
  Comedordesayuno({this.nombre});
  factory Comedordesayuno.fromJson(Map<String, dynamic> json) {
    return Comedordesayuno(nombre: json['nombre']);
  }
}

class Tiporanchodesayuno {
  final String nombretiporancho;
  Tiporanchodesayuno({this.nombretiporancho});
  factory Tiporanchodesayuno.fromJson(Map<String, dynamic> json) {
    return Tiporanchodesayuno(nombretiporancho: json['nombre']);
  }
}

class Menudesayuno {
  String descripcion;
  Menudesayuno({this.descripcion});
  factory Menudesayuno.fromJson(Map<String, dynamic> parsedJson) {
    return Menudesayuno(descripcion: parsedJson['descripcion']);
  }
}

class Menudiadesayuno {
  int idmenudia;
  String dia;
  String precio;
  String fecha;
  List<Menudesayuno> menu;
  List<Tiporanchodesayuno> tiporancho;
  List<Comedordesayuno> comedor;

  Menudiadesayuno(
      {this.idmenudia,
      this.dia,
      this.precio,
      this.fecha,
      this.menu,
      this.tiporancho,
      this.comedor});

  factory Menudiadesayuno.fromJson(Map<String, dynamic> parsedJson) {
    var list = parsedJson['menus'] as List;
    List<Menudesayuno> menu2 =
        list.map((i) => Menudesayuno.fromJson(i)).toList();

    var listtiporancho = parsedJson['tiporanchos'] as List;
    List<Tiporanchodesayuno> tiporancho2 =
        listtiporancho.map((i) => Tiporanchodesayuno.fromJson(i)).toList();

    var listComedor = parsedJson['comedors'] as List;
    List<Comedordesayuno> comedor2 =
        listComedor.map((i) => Comedordesayuno.fromJson(i)).toList();

    return Menudiadesayuno(
        idmenudia: parsedJson['idmenudia'],
        dia: parsedJson['dia'],
        precio: parsedJson['precio'],
        fecha: parsedJson['dia_fecha'],
        menu: menu2,
        tiporancho: tiporancho2,
        comedor: comedor2);
  }
}
