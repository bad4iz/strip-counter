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


// запись колонны
$app->post('/pillars/set', function ($request, $response, $args) {
     return $response->withJson($this->db->pillars()->insert($request->getParsedBody()));
    //
     // return $response->withJson($this->db->pillars()->insert($request->getParsedBody()));
});



// запись strip по id column
$app->post('/strips/set', function ($request, $response, $args) {
    return $response->withJson($this->db->strips()->insert($request->getParsedBody()));
});


// update strip по id column
$app->post('/strips/update/{id}', function ($request, $response, $args) {
    $row = $this->db->strips[$args['id']];
    return $response->withJson($row->update($request->getParsedBody()));
});

////////////////////////////////////////////////////////////////////////////
///            admin page
///////////////////////////////////////////////////////////////////////////
//// страница админа
$app->get('/admin', function ($request, $response, $args) {
    $fileTmp = file_get_contents( './admi6n/index.html');
    $file = str_replace('dist', 'admi6n/dist', $fileTmp);
    return $response->write($file);
});


// получаем колонны
$app->post('/pillars', function ($request, $response, $args) {

    $answer = [];
    $row = [];
    foreach ($this->db->pillars()->select("id, pillar") as $item) {
        $row['id'] = $item['id'];
        $row['pillar'] = $item['pillar'];
        $answer[] = $row;
    }
    return $response->withJson($answer);
});


// получаем strip по id
$app->post('/pillar/{id}', function ($request, $response, $args) {
    $answer = [];
    foreach ($this->db->pillars[$args['id']]->strips() as $item) {
        $answer[] = $item;
    }
    return $response->withJson($answer);
//    return $response->withJson($this->db->pillars[$args['id']]->strips());
});



// записываем таблицу
$app->post('/table', function ($request, $response, $args) {
    return $response->withJson($this->db->newstrips()->insert_multi($request->getParsedBody()));
});



// выгрузка файла
$app->post('/create', function ($request, $response, $args) {
    $data = $request->getParsedBody();

    $headers = json_decode($data['headers']);
    $body = json_decode($data['body']);
    $idPillars = $data['idPillars'];

    $flag = readFileCsv( $headers, $body, $idPillars);
    if($flag){
        return $response->withJson(['answer'=> $idPillars]);
    }
    return $response->withJson(['answer'=> $flag]);

    // return $response->withJson(var_dump(json_decode($data['idPillars'])));
});



$app->get('/download/{idPillars}', function($request, Slim\Http\Response $response, $args) {
    $file = __DIR__ . '/../downloads/' .$args['idPillars'];;
    $fh = fopen($file, 'rb');

    $stream = new \Slim\Http\Stream($fh); // create a stream instance for the response body

    return $response->withHeader('Content-Type', 'application/force-download')
                    ->withHeader('Content-Type', 'application/octet-stream')
                    ->withHeader('Content-Type', 'application/download')
                    ->withHeader('Content-Description', 'File Transfer')
                    ->withHeader('Content-Transfer-Encoding', 'binary')
                    ->withHeader('Content-Disposition', 'attachment; filename="' . basename($file) . '"')
                    ->withHeader('Expires', '0')
                    ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0')
                    ->withHeader('Pragma', 'public')
                    ->withBody($stream); // all stream contents will be sent to the response
});

////////////////////////////////////////////////////////////////////////////
///            admin page   download
///////////////////////////////////////////////////////////////////////////

function readFileCsv($headers, $body, $idPillars){
    $flag = false;
    $fileName = dirname(__FILE__) .'/../downloads/' . $idPillars . '.csv';
    $fp = fopen($fileName, 'w');

    fputcsv($fp, $headers, ';', '"');

    foreach ($body as $fields) {
        $flag = fputcsv($fp, $fields, ';', '"');
        // $flag =$fields;
    }
    fclose($fp);

    return $flag;
}


// Run app
$app->run();

//new PDO("mysql:dbname=strip_counter;host=172.17.0.1:3308", 'root', 'pass');

