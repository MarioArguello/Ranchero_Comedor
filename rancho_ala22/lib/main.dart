import 'package:flutter/material.dart';
import 'package:rancho_ala22/login_registro/login.dart';
import 'package:rancho_ala22/login_registro/registro.dart';
import 'package:rancho_ala22/perfil/perfil_user.dart';
import 'package:rancho_ala22/restaurantes/Restaurante_reparto.dart';
import 'package:rancho_ala22/reservas/Factura.dart';
import 'package:rancho_ala22/reservas/reserva.dart';
import 'package:rancho_ala22/perfil_pedidos/comidas.dart';
import 'package:rancho_ala22/scr/ui/desayuno_page2.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Rancho Ala 22',
      debugShowCheckedModeBanner: false,
      //home: login(),
      routes: {
        '/home': (context) => login(),
        '/registro': (context) => Registro(),
        '/perfil_user': (context) => Perfil_user(),
        '/restaurante': (context) => Restaurante_reparto(),
        '/lista_factura': (context) => ListaFactura(),
        '/lista_reserva': (context) => ListaCompras(),
        '/comidas': (context) => comidas(),
        '/desayuno_page': (context) => Desayuno_page2(),
      },
      initialRoute: '/home',
    );
  }
}
