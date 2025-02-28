<?php
/**
 *  Classe EntityRespository
 * 
 *  Classe abstraite ! Elle décrit la gestion d'une famille de ressources (produits, commandes, utilisateurs...)
 *  au niveau du système d'information (base de données).
 * 
 *  Quand on a une nouvelle famille de ressource à gérer, on créera une classe fille qui saura : 
 * 
 *  - trouver une ressource dans la base  (voir la méthode find)
 *  - trouver toutes les ressources  dans la base (voir la méthode findAll)
 *  - sauvegarder une ressource dans la base (voir la méthode save)
 *  - supprimer une ressource dans la base (voir la méthode delete)
 *  - mettre à jour une ressource dans la base (voir la méthode update)
 * 
 *  Exemple : voir la classe ProductRepository
 */
abstract class EntityRepository {
    protected $cnx;

    protected function __construct(){
        // Modifiez ici vos informations de BDD et de connexion
        try {
            $this->cnx = new PDO("mysql:host=localhost;dbname=bofl4395_ClassTrouble", "bofl4395_bounissou1", "bounissou1");
            $this->cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

}





?>