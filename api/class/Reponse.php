<?php 

class Reponse implements JsonSerializable {
    
    
    private int $id_reponse;
    private string $texte_reponse = "";
    private int $est_correcte = 0;
    private int $id_question = 0;
 

    public function __construct(int $id_reponse) {
        $this->id_reponse = $id_reponse;
        
    }

    public function jsonSerialize() : array {
        return [
            'id_reponse' => $this->id_reponse,
            'texte_reponse' => $this->texte_reponse,
            'est_correcte' => $this->est_correcte,
            'id_question' => $this->id_question
        ];
    }
    
    public function getIdReponse(): int {
        return $this->id_reponse;
    }

    public function getTexteReponse(): string {
        return $this->texte_reponse;
    }

    public function setTexteReponse(string $texte_reponse): void {
        $this->texte_reponse = $texte_reponse;
    }

    public function getEstCorrecte(): int {
        return $this->est_correcte;
    }

    public function setEstCorrecte(int $est_correcte): void {
        $this->est_correcte = $est_correcte;
    }

    public function getIdQuestion(): int {
        return $this->id_question;
    }

    public function setIdQuestion(int $id_question): void {
        $this->id_question = $id_question;
    }
}

?>