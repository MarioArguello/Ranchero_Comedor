import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:rancho_ala22/Widget_/widget_drawer_menu.dart';
import 'dart:convert' as convert;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:rancho_ala22/perfil/serializacionperfil.dart';

int idpersona;

class Perfil_user extends StatefulWidget {
  const Perfil_user({Key key, this.idcliente}) : super(key: key);
  final int idcliente;
  @override
  Perfil_ createState() => Perfil_();
}

//Color(0xFF242E56)
class Perfil_ extends State<Perfil_user> {
  List<Usuario> persona_Usuario;
  Future<List<Usuario>> getDataPerfilUser(idcliente) async {
    http.Response response = await http.get(
        Uri.parse(
            'http://192.168.68.117:3000/usuario/dataperfilpersona/$idcliente'), //url
        headers: {"Accept": "application/json"});
    return await Future.delayed(Duration(seconds: 2), () {
      List<dynamic> data = convert.jsonDecode(response.body);
      List<Usuario> users = data.map((data) => Usuario.fromJson(data)).toList();
      return users;
    });
  }

  @override
  void initState() {
    super.initState();
    this.preferencia();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 80,
          centerTitle: true,
          title: Text(
            'Perfil Usuario',
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
              },
            ),
          ],
        ),
        drawer: MenuLateral(idcliente: widget.idcliente),
        backgroundColor: Color(0xFF242E56),
        body: Container(
          child: FutureBuilder<List<Usuario>>(
              future: getDataPerfilUser(widget.idcliente),
              builder: (context, data) {
                if (data.connectionState != ConnectionState.waiting &&
                    data.hasData) {
                  var userList = data.data;
                  return ListView.builder(
                      itemCount: userList.length,
                      itemBuilder: (context, index) {
                        var userData = userList[index];

                        return SizedBox(
                          height: 600,
                          child: Stack(
                            children: <Widget>[
                              Container(
                                margin: EdgeInsets.only(top: 70),
                                padding: EdgeInsets.only(
                                  top: 30,
                                  left: 40,
                                  right: 20,
                                ),
                                // height: 500,
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.only(
                                    topLeft: Radius.circular(35),
                                    topRight: Radius.circular(50),
                                  ),
                                ),
                                child: Column(
                                  children: <Widget>[
                                    Center(
                                        child: Column(
                                      children: [
                                        // color: Colors.teal,
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
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
                                                      " " +
                                                          userData.persona.grado
                                                              .nombregrado,
                                                      style: TextStyle(
                                                          fontSize: 25,
                                                          fontWeight:
                                                              FontWeight.bold,
                                                          color: Color(
                                                              0xff242E56)),
                                                    ),
                                                  ],
                                                ),
                                                Text(
                                                  "     " +
                                                      userData.persona.nombres,
                                                  style: TextStyle(
                                                    fontSize: 25,
                                                  ),
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
                                              "Username: ",
                                              style: TextStyle(
                                                fontSize: 20,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Row(
                                              children: [
                                                Text(
                                                  userData.username,
                                                  style:
                                                      TextStyle(fontSize: 18),
                                                ),
                                                SizedBox(width: 125),
                                              ],
                                            ),
                                          ],
                                        ),
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
                                              "DNI: ",
                                              style: TextStyle(
                                                fontSize: 20,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Row(
                                              children: [
                                                Text(
                                                  userData.persona.dni,
                                                  style: TextStyle(
                                                    fontSize: 18,
                                                  ),
                                                ),
                                                SizedBox(width: 100),
                                              ],
                                            ),
                                          ],
                                        ),
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
                                              "Telefono: ",
                                              style: TextStyle(
                                                fontSize: 20,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Row(
                                              children: [
                                                Text(
                                                  userData.persona.telefono,
                                                  style: TextStyle(
                                                    fontSize: 18,
                                                  ),
                                                ),
                                                SizedBox(width: 100),
                                              ],
                                            ),
                                          ],
                                        ),
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
                                              "Correo: ",
                                              style: TextStyle(
                                                fontSize: 20,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Row(
                                              children: [
                                                Text(
                                                  userData.persona.correo,
                                                  style: TextStyle(
                                                    fontSize: 18,
                                                  ),
                                                ),
                                                SizedBox(width: 80),
                                              ],
                                            ),
                                          ],
                                        ),
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
                                              "Reparto: ",
                                              style: TextStyle(
                                                fontSize: 20,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            Row(
                                              children: [
                                                Text(
                                                  userData.persona.reparto
                                                      .nombreReparto,
                                                  style: TextStyle(
                                                    fontSize: 18,
                                                  ),
                                                ),
                                                SizedBox(width: 150),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ],
                                    )),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        );
                      });
                } else {
                  return Center(
                      child: Container(
                    height: 100,
                    width: 100,
                    margin: EdgeInsets.all(5),
                    child: CircularProgressIndicator(
                      backgroundColor: Colors.cyanAccent,
                      valueColor: new AlwaysStoppedAnimation<Color>(Colors.red),
                      strokeWidth: 10,
                    ),
                  ));
                }
              }),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.popUntil(context, ModalRoute.withName('/restaurante'));
          },
          backgroundColor: Colors.red,
          child: const Icon(Icons.reply_sharp, size: 30),
        ),
      ),
    );
  }

  void preferencia() async {
    SharedPreferences perfs = await SharedPreferences.getInstance();
    setState(() {
      idpersona = perfs.getInt("id_usuariopref");
      this.getDataPerfilUser(idpersona);
      print("tres" + idpersona.toString());
    });
  }
}
