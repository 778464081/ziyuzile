#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <conio.h> 

#define  N  5
struct  PCB
{
	char name[8];              //进程名称
	int  arrive_time;           //到达时间
	int  run_time;             //运行时间
	int  finish_time;           //完成时间
    int  zhouzhuan_time;        //周转时间
	float  daiquan_time;        //带权周转时间
    bool  finished;             //是否运行完成 
	
}; 
float avg_time,avg_daiquan_time;
struct  PCB  pcb[N],temp;
//进程输出函数
void  output()
{   
    printf("----------------------------------------------------------------------------------------------\n");
    printf("进程名   到达时间  运行时间  完成时间  周转时间  带权周转时间\n");
	printf("----------------------------------------------------------------------------------------------\n");
    for(int  i=0;i<N;i++)
	{
		printf(" %s        %d         %d         %d         %d         %.2f\n",pcb[i].name,pcb[i].arrive_time,pcb[i].run_time,pcb[i].finish_time,pcb[i].zhouzhuan_time,pcb[i].daiquan_time);
	}
	printf("平均周转时间:%.2f  平均带权周转时间:%.2f\n",avg_time,avg_daiquan_time);
    printf("----------------------------------------------------------------------------------------------\n");
}

void input(){
	int i;
	for ( i=0;i<N;i++)
	{
		printf("请输入进程名\n" );
		scanf("%s",pcb[i].name);
		printf("请输入到达时间:");
		scanf("%d",&pcb[i].arrive_time);
		printf("请输入要运行时间:");
		scanf("%d",&pcb[i].run_time);		
	}
}

void sort(){
	int i,j;
	for (i=0; i<N-1; i++) /* 外循环为排序趟数，len个数进行len-1趟 */
		for (j=0; j<N-1-i; j++) { /* 内循环为每趟比较的次数，第i趟比较len-i次 */
			if (pcb[j].arrive_time > pcb[j+1].arrive_time) { /* 相邻元素比较，若逆序则交换（升序为左大于右，降序反之） */
				temp = pcb[j];
				pcb[j] = pcb[j+1];
				pcb[j+1] = temp;
			}
		}
}

int menu(){
	int choose;
	system("cls"); /*运行前清屏*/ 
	do{ 
		printf("--------进程调度算法模拟---------\n");
		printf("  1.先来先服务进程调度算法\n");
		printf("  2.短进程优先调度算法\n");
		printf("------------------------------\n");
		printf("请选择进程调度算法(输入1或2)：");
		scanf("%d",&choose);
	}while(choose!=1&&choose!=2); 
		return choose; 
}

	void FCFS(){
		int i;
		pcb[0].finish_time=pcb[0].arrive_time+pcb[0].run_time;
		pcb[0].zhouzhuan_time=pcb[0].finish_time-pcb[0].arrive_time;
		
		pcb[0].daiquan_time=(float)pcb[0].zhouzhuan_time/(float)pcb[0].run_time;
		float zhouzhuan_time_sum=(float)pcb[0].zhouzhuan_time;
		float daiquan_time_sum=pcb[0].daiquan_time;
		for(i=1;i<N;i++)
		{	 
	           
			if(pcb[i].arrive_time<=pcb[i-1].finish_time){
				pcb[i].finish_time=pcb[i-1].finish_time+pcb[i].run_time;
			}else{
				pcb[i].finish_time=pcb[i].arrive_time+pcb[i].run_time;
			}
            pcb[i].zhouzhuan_time=pcb[i].finish_time-pcb[i].arrive_time;
			pcb[i].daiquan_time=(float)pcb[i].zhouzhuan_time/(float)pcb[i].run_time;
			zhouzhuan_time_sum+=pcb[i].zhouzhuan_time;
			daiquan_time_sum+=pcb[i].daiquan_time;
			
		}
		avg_time=zhouzhuan_time_sum/N;
		avg_daiquan_time=daiquan_time_sum/N;
		output();
	}

	void SJF(){
		int i,j,k,min_time,index;
		int  last_finishedPCB_index;    //记录上一次已经运行的进程的数组下标
		
		// 运行第一个到达的进程  得到它的完成时间、周转时间等,并设置为已访问
		pcb[0].finish_time=pcb[0].arrive_time+pcb[0].run_time;
		pcb[0].zhouzhuan_time=pcb[0].finish_time-pcb[0].arrive_time;
		pcb[0].daiquan_time=(float)pcb[0].zhouzhuan_time/pcb[0].run_time;
		pcb[0].finished=true;
		last_finishedPCB_index=0;
		
		//下面在剩下的进程中循环找出运行时间最小的进程，
		//计算它的完成时间、周转时间等，并设置为已访问。
		
		k=last_finishedPCB_index;
		for(i=0;i<N;i++)
		{
			//先找出没有访问过的运行时间最小的进程的下标
			index=-1;
			min_time=100;
			for(j=0;j<N;j++)
			{
				if(min_time>pcb[j].run_time&&pcb[j].finished==false&&pcb[j].arrive_time<=pcb[last_finishedPCB_index].finish_time)
				{
					min_time=pcb[j].run_time;
					index=j;
				}
				
			}
			
			//运行找到的最短进程  得到它的完成时间、周转时间等,并设置为已访问
			pcb[index].finish_time=pcb[last_finishedPCB_index].finish_time+pcb[index].run_time;
			pcb[index].zhouzhuan_time=pcb[index].finish_time-pcb[index].arrive_time;
			pcb[index].daiquan_time=(float)pcb[index].zhouzhuan_time/pcb[index].run_time;	   
			pcb[index].finished =true;
			last_finishedPCB_index=index;
			
		}
		float avg_sum=0,avg_daiquan_time_sum=0;
		for(i=0;i<N;i++){
			
			avg_sum+=(float)pcb[i].zhouzhuan_time;
			
			avg_daiquan_time_sum+=pcb[i].daiquan_time;
			
		}
		avg_time=avg_sum/N;
		avg_daiquan_time=avg_daiquan_time_sum/N;
		output();
	}

void  main()
	{   
		
		int i,choose;
		input();
		for( i=0;i<N;i++)
		{  		
			printf("%s    ",pcb[i].name);
			printf("%d    ",pcb[i].arrive_time);
			printf("%d \n",pcb[i].run_time);
		}
		sort();
		system ("pause");
		choose = menu();
		switch (choose){
		case 1:
			FCFS();
			break;
		case 2:
			SJF();
			break;
		}
		
}
