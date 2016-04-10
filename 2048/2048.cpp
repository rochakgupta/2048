#include<bits/stdc++.h>
using namespace std;
//string my[]={"left","up","down","right"};
class game{
    private:
        int m[4][4];
        void displayMat(){
            cout<<endl;
            for(int i=0;i<4;i++){
                for(int j=0;j<4;j++){
                    cout<<setw(6)<<m[i][j];
                }
                cout<<"\n";
            }
            cout<<endl;
        }
        bool isSame(int mat1[4][4],int mat2[4][4]){
            for(int i=0;i<4;i++){
                for(int j=0;j<4;j++){
                    if(mat1[i][j]!=mat2[i][j]){
                        return false;
                    }
                }
            }
            return true;
        }
        void copyMat(int mat1[4][4],int mat2[4][4]){
            for(int i=0;i<4;i++){
                for(int j=0;j<4;j++){
                    mat1[i][j]=mat2[i][j];
                }
            }
        }
        bool isWon(){
            for(int i=0;i<4;i++){
                for(int j=0;j<4;j++){
                    if(m[i][j]==2048){
                        return true;
                    }
                }
            }
            return false;
        }
        bool isAvailable(int mat[4][4]){
            for(int i=0;i<4;i++){
                for(int j=0;j<4;j++){
                    if(mat[i][j]==0){
                        return true;
                    }
                }
            }
            return false;
        }
        bool generateNum(int mat[4][4]){
            if(isAvailable(mat)){
                while(true){
                    int i=rand()%4;
                    int j=rand()%4;
                    if(mat[i][j]==0){
                        mat[i][j]=(rand()%2 + 1)*2;
                        return true;
                    }
                }
            }
            else{
                return false;
            }
        }
    
        void shiftLeft(int mat[4][4]){
            int i,j,pos;
            for(i=0;i<4;i++){
                pos=0;
                j=0;
                while(j<4){
                    if(mat[i][j]!=0){
                        mat[i][pos]=mat[i][j];
                        if(j!=pos){
                            mat[i][j]=0;
                        }
                        pos++;
                        j++;
                    }
                    else{
                        j++;
                    }
                }
            }
        }
        bool solveLeft(int mat[4][4]){
            int i,j,first;
            bool flag=false;
            for(i=0;i<4;i++){
                first=0;
                while(true){
                    while(first<3 && mat[i][first]==0){
                        first++;
                    }
                    if(first>=3){
                        break;
                    }
                    else{
                        if(mat[i][first]==mat[i][first+1]){
                            flag=true;
                            mat[i][first]*=2;
                            mat[i][first+1]=0;
                            first+=2;
                        }
                        else{
                            first++;
                        }
                    }
                }
            }
            return flag;
        }
        void moveLeft(int mat[4][4]){
            int prev[4][4];
            copyMat(prev,mat);
            shiftLeft(mat);
            solveLeft(mat);
            shiftLeft(mat);
            if(!isSame(prev,mat)){
                generateNum(mat);
            }
        }
    
        void shiftRight(int mat[4][4]){
            int i,j,pos;
            for(i=0;i<4;i++){
                pos=3;
                j=3;
                while(j>-1){
                    if(mat[i][j]!=0){
                        mat[i][pos]=mat[i][j];
                        if(j!=pos){
                            mat[i][j]=0;
                        }
                        pos--;
                        j--;
                    }
                    else{
                        j--;
                    }
                }
            }
        }
        bool solveRight(int mat[4][4]){
            int i,j,first;
            bool flag=false;
            for(i=0;i<4;i++){
                first=3;
                while(true){
                    while(first>0 && mat[i][first]==0){
                        first--;
                    }
                    if(first<=0){
                        break;
                    }
                    else{
                        if(mat[i][first]==mat[i][first-1]){
                            flag=true;
                            mat[i][first]*=2;
                            mat[i][first-1]=0;
                            first-=2;
                        }
                        else{
                            first--;
                        }
                    }
                }
            }
            return flag;
        }

        void moveRight(int mat[4][4]){
            int prev[4][4];
            copyMat(prev,mat);
            shiftRight(mat);
            solveRight(mat);
            shiftRight(mat);
            if(!isSame(prev,mat)){
                generateNum(mat);
            }
        }
    
        void shiftUp(int mat[4][4]){
            int i,j,pos;
            for(j=0;j<4;j++){
                pos=0;
                i=0;
                while(i<4){
                    if(mat[i][j]!=0){
                        mat[pos][j]=mat[i][j];
                        if(i!=pos){
                            mat[i][j]=0;
                        }
                        pos++;
                        i++;
                    }
                    else{
                        i++;
                    }
                }
            }
        }
        bool solveUp(int mat[4][4]){
            int i,j,first;
            bool flag=false;
            for(j=0;j<4;j++){
                first=0;
                while(true){
                    while(first<3 && mat[first][j]==0){
                        first++;
                    }
                    if(first>=3){
                        break;
                    }
                    else{
                        if(mat[first][j]==mat[first+1][j]){
                            flag=true;
                            mat[first][j]*=2;
                            mat[first+1][j]=0;
                            first+=2;
                        }
                        else{
                            first++;
                        }
                    }
                }
            }
            return flag;
        }
        void moveUp(int mat[4][4]){
            int prev[4][4];
            copyMat(prev,mat);
            shiftUp(mat);
            solveUp(mat);
            shiftUp(mat);
            if(!isSame(prev,mat)){
                generateNum(mat);
            }
        }
    
        void shiftDown(int mat[4][4]){
            int i,j,pos;
            for(j=0;j<4;j++){
                pos=3;
                i=3;
                while(i>-1){
                    if(mat[i][j]!=0){
                        mat[pos][j]=mat[i][j];
                        if(i!=pos){
                            mat[i][j]=0;
                        }
                        pos--;
                        i--;
                    }
                    else{
                        i--;
                    }
                }
            }
        }
        bool solveDown(int mat[4][4]){
            int i,j,first;
            bool flag=false;
            for(j=0;j<4;j++){
                first=3;
                while(true){
                    while(first>0 && mat[first][j]==0){
                        first--;
                    }
                    if(first<=0){
                        break;
                    }
                    else{
                        if(mat[first][j]==mat[first-1][j]){
                            flag=true;
                            mat[first][j]*=2;
                            mat[first-1][j]=0;
                            first-=2;
                        }
                        else{
                            first--;
                        }
                    }
                }
            }
            return flag;
        }
        void moveDown(int mat[4][4]){
            int prev[4][4];
            copyMat(prev,mat);
            shiftDown(mat);
            solveDown(mat);
            shiftDown(mat);
            if(!isSame(prev,mat)){
                generateNum(mat);
            }
        }
        bool isLost(){
            int n[4][4];
            if(!isAvailable(m)){
                copyMat(n,m);
                if(solveLeft(n) || solveRight(n) || solveUp(n) || solveDown(n)){
                    return false;
                }
                else{
                    return true;
                }
            }
            return false;
        }
    
    public:
        game(){
            memset(m,0,sizeof(m));
            int num=2;
            while(num){
                while(true){
                    int i=rand()%4;
                    int j=rand()%4;
                    if(m[i][j]==0){
                        m[i][j]=2;
                        num--;
                        break;
                    }
                }
            }
            displayMat();
        }
        int move(string choice){
            if(choice=="left"){
                moveLeft(m);
            }
            if(choice=="right"){
                moveRight(m);
            }
            if(choice=="up"){
                moveUp(m);
            }
            if(choice=="down"){
                moveDown(m);
            }
            displayMat();
            if(isWon()){
                return 2;
            }
            else if(isLost()){
                return 0;
            }
            else{
                return 1;
            }
        }
};
int main(){
    srand(time(NULL));
    string choice;
    int ret;
    game obj = game();
    while(true){
        cin>>choice;
        ret=obj.move(choice);
        if(ret==0){
            cout<<"\nYou lost the game!\n";
            break;
        }
        else if(ret==2){
            cout<<"\nCongrats, You won the game!\n";
            break;
        }
    }
    return 0;
}
