import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import 'package:fluttertoast/fluttertoast.dart';
import 'package:rancho_ala22/Widget_/widget_drawer_menu.dart';
import 'package:rancho_ala22/perfil/perfil_user.dart';
import 'package:flutter/material.dart';
import 'package:rancho_ala22/scr/ui/serializaciondesayuno_page.dart';
import '../models/cantidad.dart';
import 'dart:async';
import 'package:intl/intl.dart';

class Desayuno_page2 extends StatefulWidget {
  const Desayuno_page2(
      {Key key,
      this.idcliente,
      this.idrestaurant,
      this.idtiporancho,
      this.comida})
      : super(key: key);
  final int idcliente;
  final int idrestaurant;
  final int idtiporancho;
  final String comida;
  @override
  Desayuno_pageLista createState() => Desayuno_pageLista();
}

double total;
var now = new DateTime.now();
var formatter = new DateFormat('yyyy-MM-dd');
String formattedDate = formatter.format(now);

class Desayuno_pageLista extends State<Desayuno_page2> {
  static List<Cantidad> Lista_cantidad = [
    Cantidad(1),
    Cantidad(1),
    Cantidad(1),
    Cantidad(1),
    Cantidad(1),
    Cantidad(1),
    Cantidad(1),
  ];

  Future<List<Menudiadesayuno>> getDataDesayuno(
      idtiporancho, idrestaurant) async {
    http.Response response = await http.get(
        Uri.parse(
            'http://192.168.68.117:3000/usuario/datatiporancho/$idtiporancho/$idrestaurant'), //url
        headers: {"Accept": "application/json"});
    return await Future.delayed(Duration(seconds: 2), () {
      List<dynamic> data = convert.jsonDecode(response.body);
      List<Menudiadesayuno> users =
          data.map((data) => Menudiadesayuno.fromJson(data)).toList();

      return users;
    });
  }

  @override
  void initState() {
    print(widget.idcliente);
    print(widget.idcliente.toString());
    this.getDataDesayuno(widget.idtiporancho, widget.idrestaurant);
    super.initState();
  }

  int cantidad = 1;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.lightBlue[800],
        appBar: AppBar(
          toolbarHeight: 80,
          centerTitle: true,
          title: Text(
            'Reservar ' + widget.comida.toString(),
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
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          Perfil_user(idcliente: widget.idcliente)),
                );
              },
            ),
          ],
        ),
        drawer: MenuLateral(idcliente: widget.idcliente),
        body: Container(
          child: FutureBuilder<List<Menudiadesayuno>>(
              future: getDataDesayuno(widget.idtiporancho, widget.idrestaurant),
              builder: (context, data) {
                /*     if (data.connectionState != ConnectionState.waiting &&
                    data.hasData) {*/
                var userList = data.data;

                return ListView.builder(
                    itemCount: userList == null ? 0 : userList.length,
                    itemBuilder: (context, index) {
                      var userData = userList[index];
                      var cantidad1 = Lista_cantidad[index];
                      /* return ExpansionTile(
                          key: Key("$index"),
                          title: Text(userData.cantidad ?? ""),
                        );*/

                      return Card(
                          color: Colors.green[100],
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15)),
                          margin: EdgeInsets.all(17),
                          elevation: 20,
                          child: Container(
                              margin: EdgeInsets.only(top: 25),
                              padding: EdgeInsets.only(
                                top: 25,
                                left: 40,
                                right: 20,
                              ),
                              // height: 500,

                              child: Column(children: <Widget>[
                                Center(
                                    child: Column(children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      Container(
                                        height: 80.0,
                                        width: 80.0,
                                        decoration: new BoxDecoration(
                                          image: DecorationImage(
                                            image: new AssetImage(
                                                'assets/images/soldado3.png'),
                                            fit: BoxFit.fill,
                                          ),
                                          shape: BoxShape.circle,
                                          color: Colors.teal,
                                        ),
                                      ),
                                      SizedBox(width: 10),
                                      Column(
                                        children: [
                                          Row(
                                            children: [
                                              Text(
                                                "      " + userData.dia,
                                                style: TextStyle(
                                                    fontSize: 25,
                                                    fontWeight: FontWeight.bold,
                                                    color: Color(0xff242E56)),
                                              ),
                                            ],
                                          ),
                                          SizedBox(width: 10),
                                          Row(
                                            children: userData.tiporancho
                                                .map((tipo_rancho) {
                                              return new Column(
                                                children: [
                                                  new Text(
                                                    "      " +
                                                        tipo_rancho
                                                            .nombretiporancho,
                                                    style: TextStyle(
                                                        fontSize: 25,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        color:
                                                            Color(0xff242E56)),
                                                  ),
                                                ],
                                              );
                                            }).toList(),
                                          ),
                                          // SizedBox(width: 200),
                                        ],
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        "Fecha: ",
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Text(
                                              "" + userData.fecha,
                                              style: TextStyle(
                                                fontSize: 18,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ]),
                                    ],
                                  ),
                                  SizedBox(height: 10),
                                  const Divider(
                                    height: 10,
                                    thickness: 1,
                                    indent: 0,
                                    endIndent: 0,
                                  ),
                                  SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        "Descripcion: ",
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Row(
                                        children: userData.menu.map((Menu) {
                                          return new Column(
                                            children: [
                                              new Text(
                                                Menu.descripcion,
                                                style: TextStyle(
                                                    fontSize: 18,
                                                    color: Color(0xff242E56)),
                                              ),
                                            ],
                                          );
                                        }).toList(),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: 10),
                                  const Divider(
                                    height: 10,
                                    thickness: 1,
                                    indent: 0,
                                    endIndent: 0,
                                  ),
                                  SizedBox(height: 10),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        "Precio: ",
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Text(
                                              double.parse(userData.precio)
                                                  .toString(),
                                              style: TextStyle(
                                                fontSize: 18,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ]),
                                    ],
                                  ),
                                  SizedBox(height: 10),
                                  const Divider(
                                    height: 10,
                                    thickness: 1,
                                    indent: 0,
                                    endIndent: 0,
                                  ),
                                  SizedBox(height: 10),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        "Comedor: ",
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Row(
                                        children:
                                            userData.comedor.map((comedor_) {
                                          return new Column(
                                            children: [
                                              new Text(comedor_.nombre),
                                            ],
                                          );
                                        }).toList(),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: 10),
                                  const Divider(
                                    height: 10,
                                    thickness: 1,
                                    indent: 0,
                                    endIndent: 0,
                                  ),
                                  SizedBox(height: 10),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: <Widget>[
                                      IconButton(
                                          color: Colors.red,
                                          icon: const Icon(
                                              Icons.do_disturb_on_outlined,
                                              size: 30),
                                          onPressed: () {
                                            setState(() {
                                              cantidad1.cantidad_--;
                                              if (cantidad1.cantidad_ <= 1) {
                                                cantidad1.cantidad_ = 1;
                                              }
                                              print(cantidad1.cantidad_
                                                  .toString());
                                            });
                                          }),
                                      Expanded(
                                          child: Center(
                                        child: Text(
                                            cantidad1.cantidad_.toString(),
                                            style: TextStyle(fontSize: 20)),
                                      )),
                                      IconButton(
                                          color: Colors.blue,
                                          icon: const Icon(
                                              Icons.add_box_outlined,
                                              size: 30),
                                          onPressed: () {
                                            setState(() {
                                              cantidad1.cantidad_++;
                                              print(cantidad1.cantidad_);
                                            });
                                          }),
                                      Expanded(
                                        child: Center(
                                          child: Text("Total: ",
                                              style: TextStyle(fontSize: 20)),
                                        ),
                                      ),
                                      Expanded(
                                        child: Center(
                                          child: Text(
                                              "${double.parse(userData.precio) * cantidad1.cantidad_}",
                                              style: TextStyle(fontSize: 20)),
                                        ),
                                      ),
                                    ],
                                  ),
                                  SizedBox(height: 15),
                                  FlatButton(
                                      minWidth: 160.0,
                                      height: 40.0,
                                      shape: RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(18.0)),
                                      onPressed: () async {
                                        var idmenuDia =
                                            userData.idmenudia.toString();
                                        var idpersona =
                                            widget.idcliente.toString();
                                        var cant =
                                            cantidad1.cantidad_.toString();

                                        print(userData.idmenudia.toString());

                                        if (formattedDate == userData.fecha) {
                                          cantidad1.cantidad_ = 1;
                                          Fluttertoast.showToast(
                                              msg:
                                                  "Lo sentimos no se puede reservar el mismo día",
                                              toastLength: Toast.LENGTH_SHORT,
                                              gravity: ToastGravity.CENTER,
                                              timeInSecForIosWeb: 1);
                                          print(formattedDate);
                                        } else {
                                          this.alertareserva(
                                              idmenuDia, idpersona, cant);
                                          print("Reserva agg");
                                          cantidad1.cantidad_ = 1;
                                        }
                                        ;
                                      },
                                      color: Colors.green[300],
                                      child: Text('Reservar',
                                          style: TextStyle(fontSize: 20))),
                                ])),
                                SizedBox(height: 35)
                              ])));
                    });
              }),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.pop(context);
          },
          backgroundColor: Colors.red,
          child: const Icon(Icons.reply_sharp, size: 30),
        ),
      ),
    );
  }

  void alertareserva(idmenuDia, idpersona, cant) {
    print(idmenuDia.toString() + "pesona : " + idpersona.toString());
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Text("Alerta !"),
        content: Text("Estas seguro que deseas realizar la reserva?"),
        elevation: 24,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
        actions: <Widget>[
          FlatButton(
              onPressed: () async {
                var url =
                    Uri.parse('http://192.168.68.117:3000/reserva/create');
                // Await the http get response, then decode the json-formatted response.
                var response = await http.post(url, body: {
                  'idmenudia': idmenuDia,
                  'idpersona': idpersona,
                  'estado': "A",
                  'cantidad': cant,
                });

                Fluttertoast.showToast(
                    msg: "Reserva realizada con exito",
                    toastLength: Toast.LENGTH_SHORT,
                    gravity: ToastGravity.CENTER,
                    timeInSecForIosWeb: 1);

                if (response.statusCode == 200) {
                  this.setState(() {});
                }
                Navigator.of(context).pop();
              },
              child: Text("Confirmar")),
          FlatButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text("Cancelar"))
        ],
      ),
    );
  }
}
