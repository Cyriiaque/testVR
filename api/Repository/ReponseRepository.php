<?php

require_once "EntityRepository.php";
require_once "class/Reponse.php";

class ReponseRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }
    
    public function findAll() {
        $requete = $this -> cnx -> prepare("SELECT * FROM reponses");
        $requete -> execute();
        $answer = $requete -> fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }


}





?>