import 'package:flutter/material.dart';
import 'package:rancho_ala22/Widget_/widget_drawer_menu.dart';

class error_pedido extends StatefulWidget {
  @override
  Error_pedido createState() => Error_pedido();
}

class Error_pedido extends State<error_pedido> {
  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Colors.lightBlue[100],
      appBar: AppBar(
        toolbarHeight: 80,
        centerTitle: true,
        title: Text(
          'Error de Reserva',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        actions: <Widget>[
          IconButton(
            icon: new Icon(
              Icons.person,
              size: 37,
            ),
            onPressed: () => print('envia al perfil del usuario, okis'),
          ),
        ],
      ),
      drawer: MenuLateral(),
      body: SingleChildScrollView(
        child: new Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            SizedBox(
              height: 80,
            ),
            Text(
              "No se a podido realizar la reserva, vuelva luego.",
              style: TextStyle(
                  fontFamily: 'OpenSans',
                  fontWeight: FontWeight.bold,
                  fontSize: 30),
              textAlign: TextAlign.center,
            ),
            SizedBox(
              height: 50,
            ),
            Center(
                child: Container(
              height: 300,
              width: 300,
              decoration: BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage('assets/images/tristeza.png'))),
            )),
            SizedBox(
              height: 30,
            ),
            Center(
              child: FlatButton(
                  minWidth: 200.0,
                  height: 40.0,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(18.0)),
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  color: Colors.green[300],
                  child: Text('Regresar', style: TextStyle(fontSize: 20))),
            ),
          ],
        ),
      ),
    );
  }
}
