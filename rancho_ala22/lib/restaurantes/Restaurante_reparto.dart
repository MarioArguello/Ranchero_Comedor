import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import 'package:fluttertoast/fluttertoast.dart';
import 'package:rancho_ala22/Widget_/widget_drawer_menu.dart';
import 'package:rancho_ala22/perfil_pedidos/comidas.dart';
import 'package:rancho_ala22/perfil/perfil_user.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

int reparto_persona = 0;
int grado_persona = 0;

class Restaurante_reparto extends StatefulWidget {
  const Restaurante_reparto({Key key, this.idcliente}) : super(key: key);
  final int idcliente;
  @override
  _ListaRestaurante_reparto createState() => _ListaRestaurante_reparto();
}

double total;

// ignore: camel_case_types
class _ListaRestaurante_reparto extends State<Restaurante_reparto> {
  List data = [];

  Future<String> listarcompras(reparto_persona) async {
    var url = Uri.parse(
        'http://192.168.68.117:3000/usuario/dataRestaurant_reparto/$reparto_persona');
    var response = await http.get(url, headers: {"Accept": "application/json"});
    print(response);
    this.setState(() {
      data = convert.json.decode(response.body);
    });
    return "terminado";
  }

  @override
  void initState() {
    super.initState();
    this.pre();
  }

  @override
  Widget build(BuildContext context) {
    Map parametros = ModalRoute.of(context).settings.arguments;
    return Scaffold(
        backgroundColor: Colors.lightBlue[700],
        appBar: AppBar(
          toolbarHeight: 80,
          centerTitle: true,
          title: Text(
            "Bienvenido",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          actions: <Widget>[
            IconButton(
              icon: new Icon(
                Icons.person,
                size: 40,
              ),
              onPressed: () {
                Fluttertoast.showToast(
                    msg: "Perfil Usuario ;)",
                    toastLength: Toast.LENGTH_SHORT,
                    gravity: ToastGravity.CENTER,
                    timeInSecForIosWeb: 1);
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          Perfil_user(idcliente: parametros['idusuario'])),
                );
              },
            ),
          ],
        ),
        drawer: MenuLateral(idcliente: parametros['idusuario']),
        body: new ListView.builder(
            itemCount: data == null ? 0 : data.length,
            itemBuilder: (BuildContext context, int index) {
              return Card(
                  color: Colors.grey[300],
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15)),
                  margin: EdgeInsets.all(17),
                  elevation: 20,
                  child: Container(
                      margin: EdgeInsets.only(top: 5),
                      padding: EdgeInsets.only(
                        top: 5,
                        left: 40,
                        right: 20,
                      ),
                      // height: 500,

                      child: Column(children: <Widget>[
                        SizedBox(
                          height: 15,
                        ),
                        Text(
                          data[index]["nombre"],
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 25),
                        ),
                        SizedBox(
                          height: 25,
                        ),
                        Center(
                          child: MaterialButton(
                            minWidth: 100.0,
                            height: 10.0,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                                side: BorderSide(color: Colors.green[700])),
                            onPressed: () {
                              if ((parametros['idgrado'] >=
                                      data[index]["id_grado_bajo"]) &&
                                  (parametros['idgrado'] <=
                                      data[index]["id_grado_alto"])) {
                                print(data[index]["nombre"]);
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => comidas(
                                          idcliente: parametros['idusuario'],
                                          idrestaurant: data[index]
                                              ["idcomedor"])),
                                );
                              } else {
                                Fluttertoast.showToast(
                                    msg:
                                        "Usted no puede ingresar a este comedor",
                                    toastLength: Toast.LENGTH_SHORT,
                                    gravity: ToastGravity.CENTER,
                                    timeInSecForIosWeb: 1);
                                print("Usted no puede ingresar a este comedor");
                              }

                              print(data[index]["id_grado_bajo"].toString());
                              print(parametros['idgrado']);
                            },
                            color: Colors.green[300],
                            child: GestureDetector(
                              child:
                                  Image.asset('assets/images/restaurante.png'),
                            ),
                          ),
                        ),
                      ])));
            }));
  }

  void pre() async {
    SharedPreferences perfs = await SharedPreferences.getInstance();
    setState(() {
      reparto_persona = perfs.getInt("id_reparto_pref");
      this.listarcompras(reparto_persona);
      print("dos" + reparto_persona.toString());
    });
  }
}
