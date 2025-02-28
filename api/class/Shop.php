<?php 

class Shop implements JsonSerializable {
    
    
    private int $id_shop;
    private string $achat = "";
    private int $id_user= 0;
 

    public function __construct(int $id_shop) {
        $this->id_shop = $id_shop;
        
    }

    public function jsonSerialize() : array {
        return [
            'id_shop' => $this->id_shop,
            'achat' => $this->achat,
            'id_user' => $this->id_user
        ];
    }

    public function getAchat(): string {
        return $this->achat;
    }

    public function setAchat(string $achat): void {
        $this->achat = $achat;
    }

    public function getIdUser(): int {
        return $this->id_user;
    }

    public function setIdUser(int $id_user): void {
        $this->id_user = $id_user;
    }
    
}

?>