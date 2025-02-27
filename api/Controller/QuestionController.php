<?php 


require_once("Controller.php");
require_once("Repository/QuestionRepository.php");
require_once("class/Question.php");




    class QuestionController extends Controller {
        public QuestionRepository $QuestionRepository;

        public function __construct(){
            $this->QuestionRepository = new QuestionRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
            
           
                        
           
            
                return $this->QuestionRepository->findAll();
            
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