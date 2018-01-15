<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require_once '../lib/notorm-master/NotORM.php';


// Create and configure Slim app
$config = ['settings' => [
    'addContentLengthHeader' => false,
]];

$app = new \Slim\App($config);

$container = $app->getContainer();

$container['db'] = function ($container) {
    $capsule =  new NotORM(new PDO("mysql:dbname=strip_counter;host=172.17.0.1:3308", 'root', 'pass'));
    return $capsule;
};

/**
 * крос доменный заголовки
 */
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});


//// Define app routes
$app->get('/', function ($request, $response, $args) {

  return $response->write(file_get_contents('index.html' ,  FILE_USE_INCLUDE_PATH));
});




// записываем таблицу
$app->post('/table', function ($request, $response, $args) {
    $headers = ['время', 'id шва', 'длина м', 'длина ф', 'позиция шва м', 'позиция шва ф', 'колонна'];
    $body = [];
    $idPillar = 0;

//    return $response->write(var_dump($request->getParsedBody()));

    foreach ($request->getParsedBody() as $item) {
        $row = [];
        $row[] = $item['time'];
        $row[] = $item['id'];
        $row[] = $item['length'];
        $row[] = round((float)$item['length'] *  3.28084, 1);
        $row[] = $item['position'];
        $row[] = round((float)$item['position'] * 3.28084, 1);
        $row[] = $item['idPillar'];
        $idPillar = $item['idPillar'];
        $body[] = $row;
    }
    readFileCsv($headers, $body, $idPillar);
    return $response->withJson($this->db->newstrips()->insert_multi($request->getParsedBody()));
});



function readFileCsv($headers, $body, $idPillars){
    $flag = false;
    $fileName = dirname(__FILE__) .'/../downloads/' . $idPillars . '.csv';
    $fp = fopen($fileName, 'w');

    fputcsv($fp, $headers, ';', '"');

    foreach ($body as $fields) {
        $flag = fputcsv($fp, $fields, ';', '"');
    }
    fclose($fp);
    return $flag;
}

// Run app
$app->run();


