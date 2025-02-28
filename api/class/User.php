<?php 

class Client implements JsonSerializable {
    
    private int $id_user;
    private string $name;
    private int $money = 0;
    private int $round = 0;
    private array $id_questions = [];

    public function __construct(int $id_user) {
        $this->id_user = $id_user;
        
    }

    public function jsonSerialize() : array {
        return [
            'id_user' => $this->id_user,
            'players_name' => $this->name,
            'money' => $this->money,
            'round' => $this->round,
            'id_questions' => $this->id_questions
        ];
    }

    
    
    

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getMoney(): int {
        return $this->money;
    }

    public function setMoney(int $money): void {
        $this->money = $money;
    }

    public function getRound(): int {
        return $this->round;
    }

    public function setRound(int $round): void {
        $this->round = $round;
    }

    public function getIdQuestions(): array {
        return $this->id_questions;
    }

    public function setIdQuestions(array $id_questions): void {
        $this->id_questions = $id_questions;
    }
}





?>