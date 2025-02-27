<?php 

class Question implements JsonSerializable {
    
    
    private int $id_question;
    private string $texte_question = "";
    private int $niveau_question= 0;
 

    public function __construct(int $id_question) {
        $this->id_question = $id_question;
        
    }

    public function jsonSerialize() : array {
        return [
            'id_question' => $this->id_question,
            'texte_question' => $this->texte_question,
            'niveau_question' => $this->niveau_question
        ];
    }

    public function getIdQuestion(): int {
        return $this->id_question;
    }

    public function getTexteQuestion(): string {
        return $this->texte_question;
    }

    public function getNiveauQuestion(): int {
        return $this->niveau_question;
    }

    public function setTexteQuestion(string $texte_question): void {
        $this->texte_question = $texte_question;
    }

    public function setNiveauQuestion(int $niveau_question): void {
        $this->niveau_question = $niveau_question;
    }
    
}

?>