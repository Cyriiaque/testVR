<?php 


require_once("Controller.php");
require_once("Repository/ReponseRepository.php");
require_once("class/Reponse.php");




    class ReponseController extends Controller {
        public ReponseRepository $ReponseRepository;

        public function __construct(){
            $this->ReponseRepository = new ReponseRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
                return $this->ReponseRepository->findAll();         
        }

        protected function processPostRequest(HttpRequest $request) {
            
        }

        protected function processDeleteRequest(HttpRequest $request): ?array {
            return null;
        }

        protected function processPatchRequest(HttpRequest $request){
            //Not implemented by choice
        }
    }

?>