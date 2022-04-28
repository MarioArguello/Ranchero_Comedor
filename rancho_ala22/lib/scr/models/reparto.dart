class Reparto {
  String _id = "";
  String _reparto = "";

  Reparto(
    this._id,
    this._reparto,
  );
  set id(String v) {
    _id = v;
  }

  //getter
  String get id => _id;
  String get reparto => _reparto;

  set reparto(String v) {
    _reparto = v;
  }
}
