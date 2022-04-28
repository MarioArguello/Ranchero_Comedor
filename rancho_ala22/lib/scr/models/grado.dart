class Grado {
  String _id = "";
  String _grado = "";

  Grado(
    this._id,
    this._grado,
  );
  set id(String v) {
    _id = v;
  }

  //getter
  String get id => _id;
  String get grado => _grado;

  set grado(String v) {
    _grado = v;
  }
}
