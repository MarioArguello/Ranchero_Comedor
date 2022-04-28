import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:rancho_ala22/Animation/FadeAnimation.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;
import 'package:rancho_ala22/scr/models/grado.dart';
import 'package:rancho_ala22/scr/models/reparto.dart';
import 'package:rancho_ala22/scr/models/sexo.dart';

TextEditingController usernameRegistro = TextEditingController();
TextEditingController contrasenaRegistro = TextEditingController();

TextEditingController nombreRegistro = TextEditingController();
TextEditingController telefonoRegistro = TextEditingController();

TextEditingController correoRegistro = TextEditingController();
TextEditingController sexoRegistro = TextEditingController();
TextEditingController cedulaRegistro = TextEditingController();

TextEditingController codigoRegistro = TextEditingController();

class Registro extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

String _validatorPassword(String value) {
  if (!_hasMinLenght(value)) {
    return 'Contraseña debil';
  }
}

bool _hasMinLenght(String value) {
  return value.isNotEmpty && value.length >= 8;
}

class _HomePageState extends State<Registro> {
  final _formKey = GlobalKey<FormState>();
  String _mySelection;

  final RegExp phoneRegex = RegExp(r'^[0]\d{9}$');
  final RegExp emailRegex = RegExp(
      r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$");

  static List<Sexo> Lista_sexo = [
    Sexo("M", "Masculino"),
    Sexo("F", "Femenino"),
  ];

  //Lista de grados
  static List<Grado> Lista_grados = [
    Grado("1", "SRPN"),
    Grado("2", "TBRP"),
    Grado("3", "Soldado"),
    Grado("4", "Cabo Segundo"),
    Grado("5", "Cabo Primero"),
    Grado("6", "Sargento Segundo"),
    Grado("7", "Sargento Primero"),
    Grado("8", "Sub Oficial Segundo"),
    Grado("9", "Sub Oficial Primero"),
    Grado("10", "Sub Oficial Mayor"),
    Grado("11", "Sub Teniente"),
    Grado("12", "TNTE"),
    Grado("13", "Capitan"),
    Grado("14", "Mayor"),
    Grado("15", "Teniente Coronel"),
    Grado("16", "Coronel"),
    Grado("17", "General"),
  ];
  String grado_registro;
  String sexo_registro;

  List data = List(); //edited line

  Future<String> getSWData() async {
    http.Response response = await http
        .get(Uri.parse('http://192.168.10.113:3000/reparto/getAll'), //url
            headers: {"Accept": "application/json"});
    var resBody = convert.json.decode(response.body);
    setState(() {
      data = resBody;
    });

    print(resBody);

    return "Sucess";
  }

  @override
  void initState() {
    super.initState();
    this.getSWData();
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
                      height: 250,
                      width: width + 20,
                      child: FadeAnimation(
                          1.3,
                          Container(
                            decoration: BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage(
                                        'assets/images/fond1_fae1.png'),
                                    fit: BoxFit.fill)),
                          )),
                    ),
                    Positioned(
                      top: 60,
                      left: 0,
                      right: 0,
                      child: Center(
                          child: Text(
                        'Registro de Usuario',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 30),
                        textAlign: TextAlign.center,
                      )),
                    ),
                    Positioned(
                      left: 0,
                      right: 0,
                      top: 90,
                      child: Center(
                          child: Text(
                        'F.A.E',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 30),
                        textAlign: TextAlign.center,
                      )),
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
                          //
                          //Ingreso del Nombre
                          Text(
                            'Nombres',
                            textAlign: TextAlign.end,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
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
                                child: Container(
                                  padding: EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                      border: Border(
                                          bottom: BorderSide(
                                              color: Colors.grey[200]))),
                                  child: TextFormField(
                                    decoration: InputDecoration(
                                      border: InputBorder.none,
                                      hintText: "Ingrese nombres",
                                      hintStyle: TextStyle(color: Colors.grey),
                                      prefixIcon: Icon(
                                        Icons.person,
                                        color: Colors.black,
                                      ),
                                    ),
                                    controller: nombreRegistro,
                                    validator: (value) {
                                      if (value.isEmpty) {
                                        return 'Por favor ingrese Nombre';
                                      }
                                      return null;
                                    },
                                  ),
                                ),
                              )),
                          // Fin del ingreso nombre
                          SizedBox(
                            height: 15,
                          ),
                          //Ingreso del Apellido
                          Text(
                            'Username',
                            textAlign: TextAlign.end,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
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
                                child: Container(
                                  padding: EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                      border: Border(
                                          bottom: BorderSide(
                                              color: Colors.grey[200]))),
                                  child: TextFormField(
                                    decoration: InputDecoration(
                                      border: InputBorder.none,
                                      hintText: "Ingrese Username",
                                      hintStyle: TextStyle(color: Colors.grey),
                                      prefixIcon: Icon(
                                        Icons.person,
                                        color: Colors.black,
                                      ),
                                    ),
                                    controller: usernameRegistro,
                                    validator: (value) {
                                      if (value.isEmpty) {
                                        return 'Por favor ingrese Apellido';
                                      }
                                      return null;
                                    },
                                  ),
                                ),
                              )),
                          // Fin del ingreso apellidos
                          SizedBox(
                            height: 15,
                          ),
                          //Ingreso del grado
                          Text(
                            'Grado',
                            textAlign: TextAlign.end,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
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
                                child: Container(
                                  padding: EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                      border: Border(
                                          bottom: BorderSide(
                                              color: Colors.grey[200]))),
                                  child: DropdownButton(
                                    hint: Text(
                                        'Selecciona tu Grado'), // Not necessary for Option 1
                                    value: grado_registro,
                                    onChanged: (newValue) {
                                      setState(() {
                                        grado_registro = newValue;

                                        print(grado_registro);
                                      });
                                    },
                                    items: Lista_grados.map((gradoLista) {
                                      return new DropdownMenuItem<String>(
                                        child: new Text(gradoLista.grado),
                                        value: gradoLista.id,
                                      );
                                    }).toList(),
                                  ),
                                ),
                              )),

                          SizedBox(
                            height: 15,
                          ),

                          //Ingreso del Unidad
                          Text(
                            'Reparto',
                            textAlign: TextAlign.end,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
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
                                child: Container(
                                  padding: EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                      border: Border(
                                          bottom: BorderSide(
                                              color: Colors.grey[200]))),
                                  child: DropdownButton(
                                    items: data.map((item) {
                                      return new DropdownMenuItem(
                                        child: new Text(item['nombre']),
                                        value: item['idreparto'].toString(),
                                      );
                                    }).toList(),
                                    onChanged: (newVal) {
                                      setState(() {
                                        _mySelection = newVal;
                                        print(_mySelection);
                                      });
                                    },
                                    value: _mySelection,
                                  ),
                                ),
                              )),
                          // Fin del ingreso Unidad

                          SizedBox(
                            height: 15,
                          ),
                          Text(
                            'Sexo',
                            textAlign: TextAlign.end,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
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
                                child: Container(
                                  padding: EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                      border: Border(
                                          bottom: BorderSide(
                                              color: Colors.grey[200]))),
                                  child: DropdownButton(
                                    hint: Text(
                                        'Selecciona tu Sexo'), // Not necessary for Option 1
                                    value: sexo_registro,
                                    onChanged: (newValue) {
                                      setState(() {
                                        sexo_registro = newValue;
                                        print(sexo_registro);
                                      });
                                    },
                                    items: Lista_sexo.map((sexoLista) {
                                      return new DropdownMenuItem<String>(
                                        child: new Text(sexoLista.sexo),
                                        value: sexoLista.idsexo,
                                      );
                                    }).toList(),
                                  ),
                                ),
                              )),

                          SizedBox(
                            height: 15,
                          ),
                          //Ingreso de Cedula
                          Text(
                            'Cedula',
                            textAlign: TextAlign.end,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
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
                                child: Container(
                                  padding: EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                      border: Border(
                                          bottom: BorderSide(
                                              color: Colors.grey[200]))),
                                  child: TextFormField(
                                    keyboardType: TextInputType.number,
                                    decoration: InputDecoration(
                                      border: InputBorder.none,
                                      hintText: "Ingrese su Cedula",
                                      hintStyle: TextStyle(color: Colors.grey),
                                      prefixIcon: Icon(
                                        Icons.person,
                                        color: Colors.black,
                                      ),
                                    ),
                                    controller: cedulaRegistro,
                                    inputFormatters: [
                                      FilteringTextInputFormatter.allow(
                                          RegExp(r'^[0-9]*$')),
                                      LengthLimitingTextInputFormatter(10)
                                    ],
                                    validator: (value) {
                                      return null;
                                    },
                                  ),
                                ),
                              )),
                          // Fin del ingreso Cedula
                          SizedBox(
                            height: 15,
                          ),
                          Text(
                            'Telefono',
                            textAlign: TextAlign.end,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
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
                                child: Container(
                                  padding: EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                      border: Border(
                                          bottom: BorderSide(
                                              color: Colors.grey[200]))),
                                  child: TextFormField(
                                    keyboardType: TextInputType.number,
                                    decoration: InputDecoration(
                                      border: InputBorder.none,
                                      hintText: "Ingrese su Telefono",
                                      hintStyle: TextStyle(color: Colors.grey),
                                      prefixIcon: Icon(
                                        Icons.person,
                                        color: Colors.black,
                                      ),
                                    ),
                                    controller: telefonoRegistro,
                                    inputFormatters: [
                                      FilteringTextInputFormatter.allow(
                                          RegExp(r'^[0-9]*$')),
                                      LengthLimitingTextInputFormatter(10)
                                    ],
                                    validator: (value) {
                                      if (!phoneRegex.hasMatch(value)) {
                                        return 'Por favor ingrese telefono valida';
                                      }
                                      return null;
                                    },
                                  ),
                                ),
                              )),
                          // Fin del ingreso Cedula
                          SizedBox(
                            height: 15,
                          ),
                          //Ingreso del Correo
                          Text(
                            'Correo',
                            textAlign: TextAlign.end,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
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
                                child: Container(
                                  padding: EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                      border: Border(
                                          bottom: BorderSide(
                                              color: Colors.grey[200]))),
                                  child: TextFormField(
                                    decoration: InputDecoration(
                                      border: InputBorder.none,
                                      hintText: "@fae.mil.ec",
                                      hintStyle: TextStyle(color: Colors.grey),
                                      prefixIcon: Icon(
                                        Icons.email,
                                        color: Colors.black,
                                      ),
                                    ),
                                    controller: correoRegistro,
                                    validator: (value) {
                                      if (!emailRegex.hasMatch(value)) {
                                        return 'Email no valido';
                                      }
                                      return null;
                                    },
                                  ),
                                ),
                              )),
                          // Fin del ingreso Correo
                          SizedBox(
                            height: 15,
                          ),
                          //Ingreso Contraseña
                          SizedBox(
                            height: 20,
                          ),
                          Text(
                            'Contraseña',
                            textAlign: TextAlign.end,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
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
                                      color: Color.fromRGBO(196, 135, 198, .3),
                                      blurRadius: 20,
                                      offset: Offset(0, 10),
                                    )
                                  ]),
                              child: Container(
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
                                    controller: contrasenaRegistro,
                                    validator: (value) =>
                                        _validatorPassword(value)),
                              ),
                            ),
                          ),
                          //Fin Ingreso Contraseña

                          SizedBox(
                            height: 30,
                          ),
                          /* BotonRegistro */

                          FadeAnimation(
                              1.9,
                              InkWell(
                                onTap: () async {
                                  if (_formKey.currentState.validate()) {
                                    var url = Uri.parse(
                                        '192.168.0.149:3000/proceso/create');
                                    print(url);
                                    Map data = {
                                      'username': usernameRegistro.text,
                                      'password': contrasenaRegistro.text,
                                      'estado': "A",
                                      'idreparto': int.parse(_mySelection),
                                      'idgrado': int.parse(grado_registro),
                                      'nombres': nombreRegistro.text,
                                      'telefono': telefonoRegistro.text,
                                      'correo': correoRegistro.text,
                                      'sexo': sexo_registro,
                                      'dni': cedulaRegistro.text,
                                    };
                                    var body2 = convert.json.encode(data);
                                    var response = await http.post(url,
                                        headers: {
                                          "Content-Type": "application/json"
                                        },
                                        body: body2);
                                    //     'codigo': codigoRegistro.text,

                                    if (response.statusCode == 200) {
                                      var jsonResponse =
                                          convert.jsonDecode(response.body)
                                              as Map<String, dynamic>;
                                      var isUser = jsonResponse['dni'];
                                      print(isUser);
                                      if (isUser == cedulaRegistro.text) {
                                        print('Usuario registrado');
                                        Fluttertoast.showToast(
                                            msg: "Usuario registrado",
                                            toastLength: Toast.LENGTH_SHORT,
                                            gravity: ToastGravity.CENTER,
                                            timeInSecForIosWeb: 1);
                                        usernameRegistro.clear();
                                        contrasenaRegistro.clear();
                                        nombreRegistro.clear();
                                        telefonoRegistro.clear();
                                        correoRegistro.clear();
                                        cedulaRegistro.clear();
                                        Navigator.pop(context);
                                      } else {
                                        print('Error registro');
                                        Fluttertoast.showToast(
                                            msg: "Error registro " +
                                                nombreRegistro.text,
                                            toastLength: Toast.LENGTH_SHORT,
                                            gravity: ToastGravity.CENTER,
                                            timeInSecForIosWeb: 1);
                                        usernameRegistro.clear();
                                        contrasenaRegistro.clear();
                                        nombreRegistro.clear();
                                        telefonoRegistro.clear();
                                        correoRegistro.clear();
                                        cedulaRegistro.clear();
                                      }
                                    } else {
                                      print(
                                          'Falla al conectar al API REST: ${response.statusCode}.');
                                    }
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
                                      "Crear cuenta",
                                      style: TextStyle(
                                          color: Colors.white, fontSize: 17),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ),
                              )),
                          SizedBox(
                            height: 70,
                          ),
                          //fin Boton Registro
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
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pop(context);
        },
        backgroundColor: Colors.red,
        child: const Icon(Icons.reply_sharp, size: 30),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
  }
}
