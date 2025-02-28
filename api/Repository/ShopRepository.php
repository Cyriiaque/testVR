<?php

require_once "EntityRepository.php";
require_once "class/Shop.php";

class ShopRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }
    
    public function findAll() {
        $requete = $this -> cnx -> prepare("SELECT * FROM shop");
        $requete -> execute();
        $answer = $requete -> fetchAll(PDO::FETCH_CLASS);
        return $answer;

        
    }

    public function findShop($shopId) {
        $requete = $this->cnx->prepare("SELECT * FROM shop WHERE id_shop = :shopId");
        $requete->bindParam(':shopId', $shopId);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }

    public function save($shop) {
        $stmt = $this->cnx->prepare("INSERT INTO shop (achat, id_user) VALUES (:achat, :id_user)");
        $achat = $shop->getAchat();
        $idUser = $shop->getIdUser();
        $stmt->bindParam(':achat', $achat);
        $stmt->bindParam(':id_user', $idUser);
        if ($stmt->execute()) {
            return $shop;
        } else {
            return false;
        }
    }

    public function updateUser($id_shop, $achat, $id_user) {
        $stmt = $this->cnx->prepare("UPDATE shop SET achat = :achat, id_user = :id_user WHERE id_shop = :id_shop");
        $stmt->bindParam(':achat', $achat);
        $stmt->bindParam(':id_user', $id_user);
        $stmt->bindParam(':id_shop', $id_shop);
        return $stmt->execute();
    }

}





?>