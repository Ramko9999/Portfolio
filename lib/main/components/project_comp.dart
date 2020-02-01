import 'dart:convert';

import "package:flutter/material.dart";
import 'package:http/http.dart';
import 'package:portfolio/model/repository.dart';

class ProjectComponent extends StatelessWidget {

  Future<String> getRepos() async {
    String endpoint = "https:api.github.com/users/Ramko9999/repos";
    Response githubResponse = await get(endpoint);
    return githubResponse.body;
  }

  Widget buildRepoColumn(BuildContext context, List<Repository> repos, int rowSize){
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;

    List<List<Widget>> repoColumn = [];
    List<Widget> repoList = [];
    for(int i = 0; i < rowSize; i++){
      repoColumn.add([]);
    }

    int k = 0;
    for(int i = 0; i < repos.length; i++){
      repoColumn[k].add(
        RepositoryComponent(repos[i])
      );
      k = (k + 1) % rowSize;
    }
    
    repoColumn.forEach((f){
      repoList.add(Container(
        height: sH * 0.7,
        child: Container(
          width: sW / rowSize,
          child: Column(
            children: f,
          ),
        ),
      ));
    });

    return Row(
      children: repoList,
    );
  }

  Widget build(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;
    return FutureBuilder(
        future: getRepos(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            if (snapshot.data.length > 0) {
              List githubRepoData = json.decode(snapshot.data);
              List<Repository> repos =
                  githubRepoData.map((f) => Repository.fromJson(f)).toList();
              return buildRepoColumn(context, repos, 2);
            } else {
              return Text("Error");
            }
          } else {
            return Container(
              child: Center(
                child: CircularProgressIndicator(),
              ),
            );
          }
        });
  }
}

class RepositoryComponent extends StatelessWidget {
  final Repository _repo;

  RepositoryComponent(this._repo);

  Widget build(BuildContext context) {
    return Container(
      child: Row(
        children: <Widget>[
          Container(
            child: Center(child: Text("Image")),
          ),
          Column(
            children: <Widget>[
              Container(
                child: Text(_repo.name),
              )
            ],
          )
        ],
      ),
    );
  }
}
