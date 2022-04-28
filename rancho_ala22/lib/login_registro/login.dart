import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:rancho_ala22/Animation/FadeAnimation.dart';
import '/login_registro/registro.dart';
import 'package:rancho_ala22/restaurantes/Restaurante_reparto.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

/*
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;
*/
// ignore: camel_case_types
var user;
var passw;

class login extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<login> {
  final _formKey = GlobalKey<FormState>();
  // ignore: non_constant_identifier_names
  TextEditingController UsernameLogin = new TextEditingController();
  // ignore: non_constant_identifier_names
  TextEditingController PasswordLogin = new TextEditingController();
  bool isLoggedIn = false;
  @override
  void initState() {
    super.initState();
    this.obtenerPreferencias();
  }

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                height: 250,
                child: Stack(
                  children: <Widget>[
                    Positioned(
                      top: -10,
                      height: 250,
                      width: width,
                      child: FadeAnimation(
                          1,
                          Center(
                              child: Container(
                            decoration: BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage(
                                        'assets/images/fond2_fae2.png'),
                                    fit: BoxFit.fill)),
                          ))),
                    ),
                    Positioned(
                      height: 250,
                      width: width + 20,
                      child: FadeAnimation(
                          1.3,
                          Center(
                              child: Container(
                            decoration: BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage(
                                        'assets/images/fond1_fae1.png'),
                                    fit: BoxFit.fill)),
                          ))),
                    ),
                    Positioned(
                      top: 10,
                      left: 0,
                      right: 0,
                      child: Center(
                        child: GestureDetector(
                          child: Image.asset('assets/images/logo-ala22.png'),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 40),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          SizedBox(
                            height: 30,
                          ),
                          FadeAnimation(
                              1.5,
                              Text(
                                "Usuario",
                                style: TextStyle(
                                    color: Color.fromRGBO(49, 39, 79, 1),
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20),
                              )),
                          SizedBox(
                            height: 15,
                          ),
                          FadeAnimation(
                              1.7,
                              Container(
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(15),
                                    color: Colors.white,
                                    boxShadow: [
                                      BoxShadow(
                                        color:
                                            Color.fromRGBO(196, 135, 198, .3),
                                        blurRadius: 20,
                                        offset: Offset(0, 10),
                                      )
                                    ]),
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: Column(
                                        children: <Widget>[
                                          Container(
                                            padding: EdgeInsets.all(10),
                                            decoration: BoxDecoration(
                                                border: Border(
                                                    bottom: BorderSide(
                                                        color:
                                                            Colors.grey[200]))),
                                            child: TextFormField(
                                              decoration: InputDecoration(
                                                border: InputBorder.none,
                                                hintText: "Ingrese usuario",
                                                hintStyle: TextStyle(
                                                    color: Colors.grey),
                                                prefixIcon: Icon(
                                                  Icons.person,
                                                  color: Colors.black,
                                                ),
                                              ),
                                              controller: UsernameLogin,
                                              enabled: !isLoggedIn,
                                              validator: (value) {
                                                if (value.isEmpty) {
                                                  return 'Por favor ingrese cedula';
                                                }
                                                return null;
                                              },
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              )),
                          SizedBox(
                            height: 20,
                          ),
                          FadeAnimation(
                              1.5,
                              Text(
                                "Contraseña",
                                style: TextStyle(
                                    color: Color.fromRGBO(49, 39, 79, 1),
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20),
                              )),
                          SizedBox(
                            height: 15,
                          ),
                          FadeAnimation(
                              1.7,
                              Container(
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: Colors.white,
                                    boxShadow: [
                                      BoxShadow(
                                        color:
                                            Color.fromRGBO(196, 135, 198, .3),
                                        blurRadius: 20,
                                        offset: Offset(0, 10),
                                      )
                                    ]),
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: Column(
                                        children: <Widget>[
                                          Container(
                                            alignment: Alignment.centerLeft,
                                            height: 60.0,
                                            child: TextFormField(
                                              obscureText: true,
                                              style: TextStyle(
                                                fontFamily: 'OpenSans',
                                              ),
                                              decoration: InputDecoration(
                                                border: InputBorder.none,
                                                contentPadding:
                                                    EdgeInsets.only(top: 14.0),
                                                prefixIcon: Icon(
                                                  Icons.lock,
                                                  color: Colors.black,
                                                ),
                                                hintText: 'Ingrese contraseña',
                                              ),
                                              controller: PasswordLogin,
                                              enabled: !isLoggedIn,
                                              validator: (value) {
                                                if (value.isEmpty) {
                                                  return 'Por favor ingrese Contraseña';
                                                }
                                                return null;
                                              },
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              )),
                          SizedBox(
                            height: 20,
                          ),
                          FadeAnimation(
                              1.9,
                              InkWell(
                                onTap: () async {
                                  if (_formKey.currentState.validate()) {
                                    user = UsernameLogin.text;
                                    passw = PasswordLogin.text;
                                    login_api(user, passw);
                                  }
                                },
                                child: new Container(
                                  height: 50,
                                  margin: EdgeInsets.symmetric(horizontal: 10),
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20),
                                    color: Color.fromRGBO(49, 39, 79, 1),
                                  ),
                                  child: Center(
                                    child: Text(
                                      "Iniciar sesión",
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 16,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ),
                              )),
                          SizedBox(
                            height: 20,
                          ),
                          FadeAnimation(
                              1.9,
                              InkWell(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => Registro()),
                                  );
                                },
                                child: new Container(
                                  height: 50,
                                  margin: EdgeInsets.symmetric(horizontal: 10),
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20),
                                    color: Color.fromRGBO(49, 39, 79, 1),
                                  ),
                                  child: Center(
                                    child: Text(
                                      "Registro de usuario",
                                      style: TextStyle(
                                          color: Colors.white, fontSize: 16),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ),
                              )),
                          SizedBox(
                            height: 30,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  login_api(user, passw) async {
    var url =
        Uri.parse('http://192.168.68.117:3000/usuario/login/$user/$passw');
    print(url);
    // Await the http get response, then decode the json-formatted response.
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var jsonResponse =
          convert.jsonDecode(response.body) as Map<String, dynamic>;
      var isUser = jsonResponse['msg'];

      var id = jsonResponse['id_person'];
      var grado_persona = jsonResponse['grado_persona'];
      var reparto_persona = jsonResponse['reparto_persona'];
      if (isUser == '1') {
        this.guardarPreferencias(
            user, passw, id, grado_persona, reparto_persona);
        print("Login correcto " + id.toString() + grado_persona.toString());
        Fluttertoast.showToast(
            msg: "Login correcto " + user,
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1);
        Navigator.pushReplacementNamed(context, '/restaurante', arguments: {
          'idusuario': id,
          'idgrado': grado_persona,
          'idrepartopersona': reparto_persona,
        });
        UsernameLogin.clear();
        PasswordLogin.clear();
      } else {
        print("Revise su usuario y contrasena");
        Fluttertoast.showToast(
            msg: "Revise su usuario y contrasena",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1);
        UsernameLogin.clear();
        PasswordLogin.clear();
      }
    } else {
      print('Falla al conectar al API REST: ${response.statusCode}.');
    }
  }

  void guardarPreferencias(username, password, idusuario_preferencia,
      idgrado_preferencia, idrepartopersona_preferencia) async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.setString("username2", username);
    preferences.setString("password", password);
    preferences.setInt("id_usuariopref", idusuario_preferencia);
    preferences.setInt("id_grado_pref", idgrado_preferencia);
    preferences.setInt("id_reparto_pref", idrepartopersona_preferencia);
    preferences.setBool("session", true);
  }

  String username2 = '';
  String password2 = '';
  int idusuario_2;
  int idgrado_2;
  int idrepartoperson_2;

  Future obtenerPreferencias() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    setState(() {
      username2 = preferences.getString("username2") ?? "";
      password2 = preferences.getString("passw") ?? "";
      idusuario_2 = preferences.getInt("id_usuariopref") ?? 0;
      idgrado_2 = preferences.getInt("id_grado_pref") ?? 0;
      idrepartoperson_2 = preferences.getInt("id_reparto_pref") ?? 0;
      bool session = preferences.get("session");
      if (session == true) {
        /*  Navigator.of(context).pushNamedAndRemoveUntil(
          '/MemberPage', (Route<dynamic> route) => false);*/
        setState(() {
          user = username2;
          passw = password2;
        });
        Navigator.pushReplacementNamed(context, '/restaurante', arguments: {
          'idusuario': idusuario_2,
          'idgrado': idgrado_2,
          'idrepartopersona': idrepartoperson_2,
        });
        print("Usuario logeado" +
            username2 +
            " Id usuario" +
            idusuario_2.toString());
      } else {
        print("Usuario sin login");
      }
    });
    return null;
  }

  @override
  void dispose() {
    super.dispose();
    UsernameLogin.dispose();
    PasswordLogin.dispose();
  }
}
