<?php 


require_once("Controller.php");
require_once("Repository/ShopRepository.php");
require_once("class/Shop.php");




    class ShopController extends Controller {
        public ShopRepository $ShopRepository;

        public function __construct(){
            $this->ShopRepository = new ShopRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
            
            $shop = $request->getParam("shop");
            
           
            if (isset ($shop)){
                    return $this->ShopRepository->findShop($shop);
                
                
                
            }
            else {
                return $this->ShopRepository->findAll();
            }
        }

        protected function processPostRequest(HttpRequest $request): ?array {
            $json = $request->getJson();
            $obj = json_decode($json);
            if (isset($obj->achat) && isset($obj->id_user)) {
                $p = new Shop(0); // 0 is a symbolic and temporary value since the product does not have a real id yet.
                $p->setAchat($obj->achat);
                $p->setIdUser($obj->id_user);
                $ok = $this->ShopRepository->save($p); 
                return $ok ? [$p] : null;
            }
            return null;
        }

        protected function processDeleteRequest(HttpRequest $request): ?array {
            return null;
        }

        protected function processPatchRequest(HttpRequest $request){
            //Not implemented by choice
        }
    }

?>