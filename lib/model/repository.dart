class Repository{
  String url;
  String name;
  DateTime updated;
  String description;

  Repository.fromJson(Map data){
    this.url = data["html_url"];
    this.name = data["name"];
    this.description = data["description"];
    this.updated = DateTime.parse(data["updated_at"]);
  }

  String toString(){
    return "URL: $url NAME: $name DESC: $description LAST-UPDATED: $updated";
  }
}