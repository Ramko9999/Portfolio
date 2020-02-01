import "package:flutter/material.dart";
import 'components/contact_comp.dart';
import 'components/project_comp.dart';

class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  Widget _displayingWidget = ContactComponent();
  String _currentWidget = "CONTACT";

  void navigate(String target, BuildContext context) {
    if (target != _currentWidget) {
      switch (target) {
        case "PROJECT":
          setState(() {
            _displayingWidget = ProjectComponent();
            _currentWidget = "PROJECT";
          });
          break;
        case "CONTACT":
          setState((){ 
            _displayingWidget = ContactComponent();
            _currentWidget = "CONTACT";
          });
          break;
        default:
          //TODO: Make blogs page
          setState(() => _displayingWidget = Container(
                color: Colors.green,
              ));
      }
    }
  }

  Widget build(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;

    return Scaffold(
      body: Container(
        child: Column(
          children: <Widget>[
            Container(
              color: Colors.black,
              height: sH * 0.1,
              width: sW,
              child: Row(
                children: <Widget>[
                  FlatButton(
                    child: Text(
                      "Projects",
                      style: TextStyle(
                          fontFamily: "Montserrat",
                          color: Colors.white,
                          fontSize: 24),
                    ),
                    onPressed: () => navigate("PROJECT", context),
                  ),
                FlatButton(

                    child: Text(
                      "Contact",
                      style: TextStyle(
                          fontFamily: "Montserrat",
                          color: Colors.white,
                          fontSize: 24),
                    ),
                    onPressed: () => navigate("CONTACT", context),
                  ),
                ],
              ),
            ),
            Container(child: _displayingWidget)
          ],
        ),
      ),
    );
  }
}
