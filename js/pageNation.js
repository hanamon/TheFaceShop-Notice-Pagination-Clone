$(function(){ //pageNation.js
	
	var a=[]; //전체 공지
	var b=[]; //쇼핑 공지
	var c=[]; //브랜드 소식
	var d=[]; //당첨자 발표
	
	var t=[-1,-1,-1,-1]; //카운트 변수
	
	var ImgUrl = '';
	var txt ='';
	
	var FilterBtnNum = 0;
	var Rcnt = 0;
	var LastRecord = 0;
	
	// 5. 페이지 10개씩 나오기
	var StartPageNum = 0; // 페이지 네이션 시작 변수
	var End__PageNum = 0; // 페이지 네이션 끝 변수
	
	var StartRecordNum =  0; // 레코드 시작 번호 변수 - 메인함수에 사용할 변수 
	var End__RecordNum = 10; // 레코드 끝 번호 변수 
	
	// 클릭 넘버에 에드클레스 주기
	var addNum = 0;
	
	$.ajax({
		url:'ajax/notice.json',
		type:'GET',
		dataType:'JSON',
		success: function(data){
			$.each(data.gong, function(idx, obj){
				// 쇼핑과 브랜드 이미지 구분	
				if( obj.구분 == '쇼핑' ){
					ImgUrl = "<img src='img/icon_notice1.gif' alt='쇼핑' title='쇼핑'>";
				}
				else{
					ImgUrl = "<img src='img/icon_notice2.gif' alt='브랜드' title='브랜드'>";
				}
			
				// 전체 공지 데이터 입력 2차원 배열처리 저장 a[];
				t[0]++;
				a[t[0]]=[];	
				a[t[0]][0] = obj.번호;
				a[t[0]][1] = ImgUrl;
				a[t[0]][2] = obj.제목;
				a[t[0]][3] = obj.날짜;
			
				// 필터링 : 쇼핑만 저장	
				if( obj.구분 == '쇼핑' ){
					t[1]++;
					b[t[1]]=[];
					b[t[1]][0] = obj.번호;
					b[t[1]][1] = ImgUrl;
					b[t[1]][2] = obj.제목;
					b[t[1]][3] = obj.날짜;
				}
			
				// 필터링 : 브랜드만 저장	
				if( obj.구분 == '브랜' ){
					t[2]++;
					c[t[2]]=[];
					c[t[2]][0] = obj.번호;
					c[t[2]][1] = ImgUrl;
					c[t[2]][2] = obj.제목;
					c[t[2]][3] = obj.날짜;
				}
			
				// 필터링 : 당첨자 발표 저장	
				if( obj.제목.indexOf('당첨') != -1 || obj.제목.indexOf('발표') != -1 ){
					t[3]++;
					d[t[3]]=[];
					d[t[3]][0] = obj.번호;
					d[t[3]][1] = ImgUrl;
					d[t[3]][2] = obj.제목;
					d[t[3]][3] = obj.날짜;
				}
			});
			
			// 필터 버튼 클릭 이벤트
			
			// 1. 버튼에 에드클레스
			$('.filterBtn').each(function(idx){
				$(this).on({
					click: function(){
						FilterBtnNum = idx;
						$('.filterBtn').removeClass('addNoticeBtn');
						$(this).addClass('addNoticeBtn');
						
						// !초기화
						StartRecordNum = 0;
						End__RecordNum = StartRecordNum+10;
						
						AjaxFn( idx );
						
						// 클릭 넘버에 에드클레스 주기
						$('.pageNumBtn').eq(0).addClass('addPageNumBtn');
					}
				});
			});
			
			// 2. 글번호 역순으로 재정립
			/* 전체 공지 글번호는 이미 정리된 상태
			   쇼핑 공지 글번호를 역순으로 정리해서 재기입(재 저장)
			   쇼핑 공지 글번호 b[][0]의 적당한 카운트 값 - t 를 이용
			   Rcnt = t[1]+1; == 0 ~ 143
			   쇼핑 공지 전체 카운트 개수	*/
			
			Rcnt = b.length; 
			for(i=0; i<b.length; i++){
				b[i][0] = Rcnt;
				Rcnt--;
			}
			
			Rcnt = c.length; 
			for(i=0; i<c.length; i++){
				c[i][0] = Rcnt;
				Rcnt--;
			}
			
			Rcnt = d.length; 
			for(i=0; i<d.length; i++){
				d[i][0] = Rcnt;
				Rcnt--;
			}
			
			// 3. 메인 처리 프로그램	
			function AjaxFn(z){
				// 전체 공지
				if( z == 0 ){
					// 전체 공지 a[][]배열 값 모두를 웹사이트에 바인딩
					// 총 레코드 수 만큼 반복(행렬) 출력
					LastRecord = a.length; //189
					for(i=StartRecordNum; i<End__RecordNum; i++){
						txt += '<tr>';
						for(j=0; j<4; j++){
							txt += '<td><a href="javascript:" class="gongBtn">' + a[i][j] + '</a></td>';
						}
						txt += '</tr>';
					}
					$('tbody').html( txt );
					txt = '';
					
				}
				// 쇼핑 공지
				else if( z == 1 ){
					LastRecord = b.length; //150
					for(i=StartRecordNum; i<End__RecordNum; i++){
						txt += '<tr>';
						for(j=0; j<4; j++){
							txt += '<td><a href="javascript:" class="gongBtn">' + b[i][j] + '</a></td>';
						}
						txt += '</tr>';
					}
					$('tbody').html( txt );
					txt = '';
				} 
				// 브랜드 소식
				else if( z == 2 ){
					LastRecord = c.length; //39
					for(i=StartRecordNum; i<End__RecordNum; i++){
						txt += '<tr>';
						for(j=0; j<4; j++){
							txt += '<td><a href="javascript:" class="gongBtn">' + c[i][j] + '</a></td>';
						}
						txt += '</tr>';
					}
					$('tbody').html( txt );
					txt = '';
				}
				// 당첨자 발표
				else if( z == 3 ){
					LastRecord = d.length; //10
					for(i=StartRecordNum; i<End__RecordNum; i++){
						txt += '<tr>';
						for(j=0; j<4; j++){
							txt += '<td><a href="javascript:" class="gongBtn">' + d[i][j] + '</a></td>';
						}
						txt += '</tr>';
					}
					$('tbody').html( txt );
					txt = '';
				}
				
				// 페이지 버튼 추가
				PageNationBtnFn(z);
			}
			
			// 메인 프로그램
			AjaxFn(0);
			
			// 클릭 넘버에 에드클레스 주기
			$('.pageNumBtn').eq(0).addClass('addPageNumBtn');
			
			// 4. 페이지 네이션의 페이지 버튼 추가 생성
			function PageNationBtnFn(z){
				// 버튼의 개수는 전체 레코드 개수가 중요
				LastRecord = t[z]; //총 레코드 개수 
				
				// 9. 페이지 버튼 10개씩 나눠 보임 
				// 10개 미만인 경우 버튼 처리 예]레코드 parseInt(16개/10+0.9) = 2개
				if( parseInt(LastRecord/10+0.9) < 10 ){
					StartPageNum = 0;
					End__PageNum = parseInt(LastRecord/10+0.9) % 10;
				}
				else{
					StartPageNum = 0;
					End__PageNum = StartPageNum + 10;
				}
				
				// 페이지 넘김 (그룹단위로 넘김 1,2,3,4,5,6,7,8,9,10 -- 11,12,13,14,15,16,17,18,19)
				// 10pg 넘어가면 11 ~ 19 변환 
				// 10pg 이하이면  1 ~ 10 변환 
				// 레코드가 100을 초과하면 10pg 초과하면
				if( End__RecordNum/10 > 10 ){
					//다음 그룹으로 변경 11~19
					if( parseInt(LastRecord/10+0.9)/10 >= 1 ){
						StartPageNum = 10;
						End__PageNum = StartPageNum + (parseInt(LastRecord/10+0.9) % 10);
					}
				}
				
				// 18.9 == parseInt(189개/10+0.9)
				$('.pageNum-wrap>li').remove();
				for(i=StartPageNum; i<End__PageNum; i++){
					$('.pageNum-wrap').append("<li><span><a href='javascript:' class='pageNumBtn'>" + (i+1) + "</a></span></li>");
				}
				
				// 클릭 넘버에 에드클레스 주기
				$('.pageNumBtn').each(function(idx){
					$(this).on({
						click: function(){
							addNum = idx;
						}
					});
				});
			}
			
			// 6. 페이지 버튼 클릭 이벤트 - append로 추가된 버튼 사용법
			$(document).on('click', '.pageNumBtn', function(){
				// 클릭한 번호로 페이지를 호출 레코드 10개씩 1-   0 ~  10
				// 클릭한 번호로 페이지를 호출 레코드 10개씩 1-  10 ~  20
				// 클릭한 번호로 페이지를 호출 레코드 10개씩 1-  20 ~  30
				// 클릭한 번호로 페이지를 호출 레코드 10개씩 1-  90 ~ 100
				// 클릭한 번호로 페이지를 호출 레코드 10개씩 1- 180 ~ 189 (예외)
				LastRecord = t[FilterBtnNum];
				
				StartRecordNum = (parseInt($(this).text())-1)*10;
				End__RecordNum = StartRecordNum+10;
				
				// 마지막 페이지 레코드 오류처리
				if( End__RecordNum > LastRecord ){
					StartRecordNum = LastRecord - (LastRecord % 10);
					End__RecordNum = LastRecord+1;
				}
				
				// 메인함수 호출 실행
				AjaxFn(FilterBtnNum);
				
				// 클릭 넘버에 에드클레스 주기
				$('.pageNumBtn').eq(addNum).addClass('addPageNumBtn');
			});
			
			// 7. 다음버튼
			$('.pageNumNextBtn').on({
				click: function(){
					// 마지막 레코드
					LastRecord = t[FilterBtnNum];
					
					// 현재위치에서 + 10;
					StartRecordNum += 10;
					End__RecordNum  = StartRecordNum+10;
					
					// 마지막 페이지 레코드 오류처리
					if( End__RecordNum > LastRecord ){
						StartRecordNum = LastRecord - (LastRecord % 10);
						End__RecordNum = LastRecord+1;
					}
					
					// 페이지버튼 추가
					PageNationBtnFn(FilterBtnNum);
					
					// 메인함수 호출 실행
					AjaxFn(FilterBtnNum);
					
					// 클릭 넘버에 에드클레스 주기
					addCnt = (StartRecordNum/10);
					if( StartRecordNum > 90 ){
						addCnt = (StartRecordNum/10)-10;
					}
					$('.pageNumBtn').eq(addCnt).addClass('addPageNumBtn');
				}
			});
			
			// 8. 이전버튼
			$('.pageNumPrevBtn').on({
				click: function(){
					// 현재위치에서 - 10;
					StartRecordNum -= 10;
					End__RecordNum  = StartRecordNum+10;
					
					// 오류처리
					if( StartRecordNum < 0 ){
						StartRecordNum = 0;
						End__RecordNum = StartRecordNum+10;
					}
					
					// 페이지버튼 추가
					PageNationBtnFn(FilterBtnNum);
					
					// 메인함수 호출 실행
					AjaxFn(FilterBtnNum);
					
					// 클릭 넘버에 에드클레스 주기
					addCnt = (StartRecordNum/10);
					if( StartRecordNum > 90 ){
						addCnt = (StartRecordNum/10)-10;
					}
					$('.pageNumBtn').eq(addCnt).addClass('addPageNumBtn');
				}
			});
		},
		error: function(){
			alert('error');
		}
	});
	
}); //pageNation.js


































