import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LanguageScheme{
  static getColor(String lang){
    Map<String, Color> schemeMap = {"JAVA": Colors.brown, "DART": Colors.teal, "JAVASCRIPT": Colors.yellow, "PYTHON": Color.fromRGBO(0, 0, 128, 1)};
    if(schemeMap.containsKey(lang.toUpperCase())){
      return schemeMap[lang.toUpperCase()];
    }
    return Colors.red;
  }
}