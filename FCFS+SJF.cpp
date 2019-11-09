#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <conio.h> 

#define  N  5
struct  PCB
{
	char name[8];              //��������
	int  arrive_time;           //����ʱ��
	int  run_time;             //����ʱ��
	int  finish_time;           //���ʱ��
    int  zhouzhuan_time;        //��תʱ��
	float  daiquan_time;        //��Ȩ��תʱ��
    bool  finished;             //�Ƿ�������� 
	
}; 
float avg_time,avg_daiquan_time;
struct  PCB  pcb[N],temp;
//�����������
void  output()
{   
    printf("----------------------------------------------------------------------------------------------\n");
    printf("������   ����ʱ��  ����ʱ��  ���ʱ��  ��תʱ��  ��Ȩ��תʱ��\n");
	printf("----------------------------------------------------------------------------------------------\n");
    for(int  i=0;i<N;i++)
	{
		printf(" %s        %d         %d         %d         %d         %.2f\n",pcb[i].name,pcb[i].arrive_time,pcb[i].run_time,pcb[i].finish_time,pcb[i].zhouzhuan_time,pcb[i].daiquan_time);
	}
	printf("ƽ����תʱ��:%.2f  ƽ����Ȩ��תʱ��:%.2f\n",avg_time,avg_daiquan_time);
    printf("----------------------------------------------------------------------------------------------\n");
}

void input(){
	int i;
	for ( i=0;i<N;i++)
	{
		printf("�����������\n" );
		scanf("%s",pcb[i].name);
		printf("�����뵽��ʱ��:");
		scanf("%d",&pcb[i].arrive_time);
		printf("������Ҫ����ʱ��:");
		scanf("%d",&pcb[i].run_time);		
	}
}

void sort(){
	int i,j;
	for (i=0; i<N-1; i++) /* ��ѭ��Ϊ����������len��������len-1�� */
		for (j=0; j<N-1-i; j++) { /* ��ѭ��Ϊÿ�˱ȽϵĴ�������i�˱Ƚ�len-i�� */
			if (pcb[j].arrive_time > pcb[j+1].arrive_time) { /* ����Ԫ�رȽϣ��������򽻻�������Ϊ������ң�����֮�� */
				temp = pcb[j];
				pcb[j] = pcb[j+1];
				pcb[j+1] = temp;
			}
		}
}

int menu(){
	int choose;
	system("cls"); /*����ǰ����*/ 
	do{ 
		printf("--------���̵����㷨ģ��---------\n");
		printf("  1.�����ȷ�����̵����㷨\n");
		printf("  2.�̽������ȵ����㷨\n");
		printf("------------------------------\n");
		printf("��ѡ����̵����㷨(����1��2)��");
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
		int  last_finishedPCB_index;    //��¼��һ���Ѿ����еĽ��̵������±�
		
		// ���е�һ������Ľ���  �õ��������ʱ�䡢��תʱ���,������Ϊ�ѷ���
		pcb[0].finish_time=pcb[0].arrive_time+pcb[0].run_time;
		pcb[0].zhouzhuan_time=pcb[0].finish_time-pcb[0].arrive_time;
		pcb[0].daiquan_time=(float)pcb[0].zhouzhuan_time/pcb[0].run_time;
		pcb[0].finished=true;
		last_finishedPCB_index=0;
		
		//������ʣ�µĽ�����ѭ���ҳ�����ʱ����С�Ľ��̣�
		//�����������ʱ�䡢��תʱ��ȣ�������Ϊ�ѷ��ʡ�
		
		k=last_finishedPCB_index;
		for(i=0;i<N;i++)
		{
			//���ҳ�û�з��ʹ�������ʱ����С�Ľ��̵��±�
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
			
			//�����ҵ�����̽���  �õ��������ʱ�䡢��תʱ���,������Ϊ�ѷ���
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
