class Sexo {
  String _idsexo = "";
  String _sexo = "";

  Sexo(
    this._idsexo,
    this._sexo,
  );
  set idsexo(String v) {
    _sexo = v;
  }

  //getter
  String get idsexo => _idsexo;
  String get sexo => _sexo;

  set sexo(String v) {
    _sexo = v;
  }
}
