<?php 


require_once("Controller.php");
require_once("Repository/UserRepository.php");
require_once("class/User.php");




    class UserController extends Controller {
        public UserRepository $UserRepository;

        public function __construct(){
            $this->UserRepository = new UserRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
            
            $name = $request->getParam("name");
            
           
            if (isset ($name)){
                // if ($request->getParam("items")){
                //     return $this->UserRepository->finditems($name);
                // }
                
                    return $this->UserRepository->finduser($name);
                
                
                
            }
            else {
                return $this->UserRepository->findAll();
            }
        }

        protected function processPostRequest(HttpRequest $request)  {
            $json = $request->getJson();
            $obj = json_decode($json);
            $p = new Client(0); // 0 is a symbolic and temporary value since the product does not have a real id yet.
            $p->setName($obj->name);
            $p->setMoney($obj->money);
            $p->setRound($obj->round);
            $p->setIdQuestions($obj->id_questions);


            $ok = $this->UserRepository->save($p); 
            return $ok ? $p : false;
        }

        protected function processDeleteRequest(HttpRequest $request): ?array {
            return null;
        }

        protected function processPatchRequest(HttpRequest $request){
            return null;
        }
    }

?>