if [ -d "./node_module" ] 
then 
    echo "node module directory does not exist" 
    npm install
else 
    $1
fi